import { createEntityAdapter, createSlice, EntityId } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { IArticleCategory } from "@/@types/article/ArticleType";

export const articleAdapter  = createEntityAdapter<IArticleCategory, EntityId>({
  selectId: (product: { id: EntityId }) => product.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name), // ตัวเลือกการจัดเรียง
});

const initialState = articleAdapter.getInitialState();

const articleSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setArticle : articleAdapter.setAll,
  },
});

export const { setArticle } = articleSlice.actions;

export const {
  selectAll: selectAllsetArticle,
  selectById: selectsetArticleInById,
  selectEntities: selectsetArticleEntities,
  selectIds: selectsetArticle,
  selectTotal: selectTotalsetArticleIn,
} = articleAdapter.getSelectors<RootState>((state) => state.ArticleStore);

export const articleReducer = articleSlice.reducer;