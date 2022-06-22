export type ICoupon = {
  buttonText: string;
  created_at: string;
  created_by: {
    id: number;
    firstname: string;
    lastname: string;
    username: null;
  };
  description: string;
  gradientColors: { start: string; end: string };
  id: number;
  title: string;
  updated_at: string;
  updated_by: {
    id: number;
    firstname: string;
    lastname: string;
    username: null;
  };
};
