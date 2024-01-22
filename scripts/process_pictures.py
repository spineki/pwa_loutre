# carreful, this will download a ~176Mo model the first time at 'C:\Users\yourName\.u2net\u2net.onnx
# Don't forget to delete it if it takes too much space !

from typing import List, Tuple, TypeAlias 
import os
from pathlib import Path

from rembg import remove
from PIL import Image

ResizeType: TypeAlias  = Tuple[int, int] | None

tmp_folder = Path("tmp")
try:
    os.mkdir(tmp_folder)
except:
    print("tmp_folder already created")

class Task():
    def __init__(self, input_path: str, output_path: str, shouldRemoveBackground: bool, resize: ResizeType) -> None:
        self.input_path = input_path
        self.output_path = output_path
        self.shouldRemoveBackground = shouldRemoveBackground
        self.resize = resize
        self.last_file_path = input_path

    # Copy a file from last temporary location
    def copy_file(self):
        with open(self.last_file_path, 'rb') as src, open(self.output_path, 'wb') as dst:
            dst.write(src.read())

    def remove_background(self):
        if not self.shouldRemoveBackground:
            return
        
        temp_output_path = tmp_folder / "remove_background.png"

        with open(self.last_file_path, 'rb') as input_file, open(temp_output_path, 'wb') as output_file:
            input_file = input_file.read()
            output = remove(input_file)
            output_file.write(output)
        self.last_file_path = temp_output_path

    def resize_picture(self):
        if self.resize is None:
            return
        
        temp_output_path = tmp_folder / "resize_picture.png"
    
        image = Image.open(self.last_file_path)
        image.thumbnail((self.resize[0], self.resize[0]))
        image.save(temp_output_path)
        self.last_file_path = temp_output_path

    def execute(self):
        print(f"> {Path(self.input_path).stem}:")
        self.remove_background()
        self.resize_picture()
        self.copy_file()
    
    def show_size_change(self):
        print(f"before: {os.stat(self.input_path).st_size // 1024}kB, after {os.stat(self.output_path).st_size // 1024} kB")


tasks: List[Task] = [
    Task( "../heavy_assets/ingredients.jpeg", "../public/ingredients.png", True, (64, 64)),
    Task( "../heavy_assets/cooking_book.jpeg", "../public/cooking_book.png", True, (64, 64)),
    Task( "../heavy_assets/comments.jpeg", "../public/comments.png", True, (64, 64)),
    Task( "../heavy_assets/tutorial_picture.jpeg", "../public/tutorial_picture.png", False, (300, 300)),
]

for task in tasks:
    task.execute()
    task.show_size_change()
    # removing background
    
    
