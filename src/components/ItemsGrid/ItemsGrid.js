import React, { useState, lazy } from "react";
import { useInView } from "react-intersection-observer";
import "./ItemsGrid.css";

const DetailsModal = lazy(() => import("components/DetailsModal/DetailsModal"));
const ItemCard = lazy(() => import("components/ItemCard/ItemCard"));
const ItemCardMemoized = React.memo(ItemCard);
const DetailsModalMemoized = React.memo(DetailsModal);

const ItemsGrid = ({ data, ...rest }) => {
  const [ref, inView] = useInView({
    rootMargin: "200px 0px",
  });

  const [detailsModalData, setDetailsModalData] = useState(null);

  return (
    <div
      ref={ref}
      style={{ minHeight: !inView ? "30000px" : null }}
      className={"Search-Result-Grid"}
    >
      {inView &&
        data.map((id) => (
          <ItemCardMemoized
            {...rest}
            setDetailOverlay={setDetailsModalData}
            id={id}
            key={id}
          />
        ))}

      {detailsModalData && (
        <DetailsModalMemoized
          item={detailsModalData}
          closeModal={() => setDetailsModalData(null)}
        />
      )}
    </div>
  );
};

export default ItemsGrid;
