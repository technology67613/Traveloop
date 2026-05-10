export interface Trip {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  cover_image_url: string | null;
  start_date: string;
  end_date: string;
  total_budget: number | null;
  invoice_status: 'pending' | 'paid';
  is_public: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface TripStop {
  id: string;
  trip_id: string;
  city_name: string;
  city_id: string | null;
  country: string | null;
  start_date: string | null;
  end_date: string | null;
  description: string | null;
  budget_amount: number | null;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  imageUrl: string;
}
