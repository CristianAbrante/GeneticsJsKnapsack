import React from "react";

import { KnapsackItem } from "../params/KnapsackItem";
import "./KnapsackItemsList.css";
import KnapsackItemCard from "./KnapsackItemCard";
import { BinaryIndividual } from "genetics-js";

export interface KnapsackItemsListProps {
  items: KnapsackItem[];
  individual?: BinaryIndividual;
  deleteDisabled?: boolean;
  onDeleteItem?: (index: number) => void;
}

const KnapsackItemsList: React.FC<KnapsackItemsListProps> = props => (
  <div className="knapsack-items-container">
    {props.items.map((item, key) => (
      <KnapsackItemCard
        index={key}
        key={key}
        item={item}
        selected={props.individual ? props.individual.get(key) : false}
        deleteDisabled={props.deleteDisabled}
        onDeleteItem={props.onDeleteItem}
      />
    ))}
  </div>
);

export default KnapsackItemsList;
