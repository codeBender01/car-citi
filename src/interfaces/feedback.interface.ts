export interface SendFeedback {
  title: string;
  description: string;
  email: string;
  phone: string;
  fileUrl: string;
}

export interface OneFeedback {
  id: string;
  title: string;
  description: string;
  email: string;
  phone: string;
  fileUrl: string;
  created: string;
}

export interface FeedbacksList {
  count: number;
  rows: OneFeedback[];
}
