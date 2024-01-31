import { CSSProperties, ReactNode } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

interface RecipesListProps {
  nbColumns: number;
  nbItems: number;
  hasNextPage: boolean;
  isNextPageLoading: boolean;
  loadNextPage: () => void;
  isItemLoaded: (index: number) => boolean;
  RowRender: ({
    index,
    style,
  }: {
    index: number;
    style: CSSProperties;
  }) => ReactNode;
}

export function InfiniteList(props: RecipesListProps) {
  const {
    hasNextPage,
    isNextPageLoading,
    nbColumns,
    nbItems,
    loadNextPage,
    RowRender,
    isItemLoaded,
  } = props;

  const rowCount = hasNextPage
    ? Math.ceil(nbItems / nbColumns) + 1
    : Math.ceil(nbItems / nbColumns);

  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;

  return (
    <AutoSizer>
      {({ height, width }) => (
        <div style={{ height, width }}>
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={rowCount}
            loadMoreItems={loadMoreItems}
          >
            {({ onItemsRendered, ref }) => (
              <FixedSizeList
                ref={ref}
                itemCount={1000}
                onItemsRendered={onItemsRendered}
                itemSize={width / nbColumns}
                height={height}
                width={width}
                layout="vertical"
              >
                {RowRender}
              </FixedSizeList>
            )}
          </InfiniteLoader>
        </div>
      )}
    </AutoSizer>
  );
}
