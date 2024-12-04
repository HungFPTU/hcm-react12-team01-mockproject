export interface RegisterGooglePublicResponse {
    success: boolean;
    data: {
      email: string;
      name: string;
      google_id: string;
      role: string;
      status: boolean;
      description: string;
      phone_number: string;
      avatar_url: string;
      video_url: string;
      is_verified: boolean;
      token_version: number;
      balance: number;
      balance_total: number;
      bank_name: string;
      bank_account_no: string;
      bank_account_name: string;
      is_deleted: boolean;
      _id: string;
      dob: string;
      created_at: string;
      updated_at: string;
      __v: number;
    };
  }
  