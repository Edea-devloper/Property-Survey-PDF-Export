import { SPFI, spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { WebPartContext } from "@microsoft/sp-webpart-base";

// Initialize SharePoint context
let sp: SPFI;

export const initializeSP = (context: WebPartContext): void => {
  sp = spfi().using(SPFx(context));
};

export const getListItemById = async (listTitle: string, itemId: number): Promise<any | null> => {
  try {
    const item = await sp.web.lists.getByTitle(listTitle).items.getById(itemId)();
    console.log("Fetched item:", item);
    return item;
  } catch (error) {
    console.error("Error fetching list item:", error);
    return null;
  }
};

export const getListItems = async (listTitle: string): Promise<any | null> => {
  try {
    // const item = await sp.web.lists.getByTitle(listTitle).items();
    const item = await sp.web.lists.getByTitle(listTitle).items
      .select("*")      
      .top(5000)();
    console.log("Fetched item:", item);
    return item;
  } catch (error) {
    console.error("Error fetching list item:", error);
    return null;
  }
};

export const fetchDocuments = async (libraryName: string): Promise<any[]> => {
  try {
    const items = await sp.web.lists
      .getByTitle(libraryName)
      .items
      .select("Id", "Title", "FileLeafRef", "FileRef")
      .filter("FSObjType eq 0") // Ensure only files, not folders
      .top(5000)();

    console.log("Documents:", items);
    return items;
  } catch (error) {
    console.error("Error fetching documents:", error);
    return [];
  }
};