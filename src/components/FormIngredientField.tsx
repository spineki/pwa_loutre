import { Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import { Control, Controller, FieldValues, Path, UseFieldArrayRemove, UseFormWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import TextField from "@mui/material/TextField";

import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SplitscreenIcon from "@mui/icons-material/Splitscreen";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";



interface FormIngredientFieldProps<T extends FieldValues> {
    id: string,
    index: number,
    control: Control<T, unknown>,
    watch: UseFormWatch<T>,
    remove: UseFieldArrayRemove,
    split: (index: number) => void,
    textName: Path<T>,
    isSectionName: Path<T>,
    minRows?: number,
}

export function FormIngredientField<T extends FieldValues>(props: FormIngredientFieldProps<T>) {

    const { t } = useTranslation();

    const { id, index, control, remove, split, isSectionName, minRows, textName, watch } = props;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openMoreOptionMenu = Boolean(anchorEl);

    const handleMoreOptionsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);

    }
    const handleMoreOptionsClose = () => {
        setAnchorEl(null);
    };

    return (
        <Draggable
            draggableId={`ingredients-item-${index}`}
            index={index}
        >
            {(provided) => (
                <div
                    key={id}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    {watch(isSectionName) && <Divider sx={{ marginBottom: 2 }} />}
                    <Box sx={{ display: "flex", flexDirection: "row" }} gap={1}>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Controller
                                name={isSectionName}
                                control={control}
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },

                                }) => (
                                    <IconButton
                                        color={!error ? "primary" : "error"}
                                        onClick={() => onChange(!value)}
                                    >
                                        {value ? <StarIcon /> : <StarBorderIcon />}
                                    </IconButton>
                                )}
                            />

                            <IconButton
                                {...provided.dragHandleProps}
                            >
                                <DragIndicatorIcon />
                            </IconButton>

                        </Box>
                        <Controller
                            name={textName}
                            control={control}
                            render={({
                                field: { onChange, value },
                                fieldState: { error },
                            }) => (
                                <TextField
                                    label={watch(isSectionName) ? t("Section") : t("Ingredient")}
                                    helperText={error ? error.message : null}
                                    error={!!error}
                                    onChange={onChange}
                                    value={value}
                                    fullWidth
                                    minRows={minRows}
                                    multiline
                                    variant="outlined"
                                    InputProps={{
                                        sx: { alignItems: "flex-start", paddingTop: 1 },
                                        endAdornment:
                                            <>
                                                <InputAdornment position="end" sx={{ paddingTop: 2 }}>
                                                    <IconButton onClick={handleMoreOptionsClick}>
                                                        <MoreVertIcon />
                                                    </IconButton>
                                                </InputAdornment>
                                                <Menu
                                                    anchorEl={anchorEl}
                                                    open={openMoreOptionMenu}
                                                    onClose={handleMoreOptionsClose}
                                                >
                                                    <MenuList>
                                                        <MenuItem onClick={() => {
                                                            remove(index);
                                                            handleMoreOptionsClose();
                                                        }}>
                                                            <ListItemIcon>
                                                                <DeleteIcon fontSize="small" />
                                                            </ListItemIcon>
                                                            <ListItemText>{t("Delete")}</ListItemText>
                                                        </MenuItem>
                                                        <MenuItem onClick={() => {
                                                            split(index);
                                                            handleMoreOptionsClose();
                                                        }}>
                                                            <ListItemIcon>
                                                                <SplitscreenIcon fontSize="small" />
                                                            </ListItemIcon>
                                                            <ListItemText>{t("Split")}</ListItemText>
                                                        </MenuItem>
                                                    </MenuList>
                                                </Menu>
                                            </>
                                    }}
                                />
                            )}
                        />
                    </Box>

                </div>
            )}
        </Draggable>
    )

}