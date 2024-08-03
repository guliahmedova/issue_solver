export type RequestCategory = {
    categoryName: string;
    categoryId: number;
  };
  
 export  type RequestsDataType = {
    requestId: number;
    fullName: string;
    address: string;
    status: string;
    organizationName: string;
    createDate: string;
    commentCount: number;
    likeCount: number;
    likeSuccess: boolean;
    category: RequestCategory;
    description: string;
  };