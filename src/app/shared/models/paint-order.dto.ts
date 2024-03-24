export interface PaintOrder {
  id: number;
  address: string;
  color: string;
  paint_used: number;
  order_status: string;
  color_id: number;
  painter_id: string;
}

export interface CreateOrder {
  address: string; // The address of the house to be painted. (Required)
  color: string; // The color of paint to be used. (Required)
  color_id: number; // The ID of the paint color. (Required)
  painter_id: string; // The ID of the painter assigned to the house.
}


export interface  CompleteOrder {
  order_id: number; // The ID of the order to complete. (Required)
  painter_id: string; // The ID of the painter completing the order. (Required)
  no_paint_used: number; // The quantity of paint used for the order. (Required)
  color_id: number; // The ID of the paint color used for the order. (Required)
}
