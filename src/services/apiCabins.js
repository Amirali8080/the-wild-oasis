import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}
const URL = "https://wyigkchwvcewrcxvtnio.supabase.co";

export async function createEditCabin(cabin, id) {
  console.log(cabin, id);
  const hasImagePath = cabin.image?.startsWith?.(URL);
  const imageName = `${Math.random()}-${cabin.image.name}`.replaceAll("/", "");
  // if we want to edit cabin, we probably have a image so we dont have to create a new one, that's the reason we check it
  const imagePath = hasImagePath
    ? cabin.image
    : `${URL}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1) Create/Edit Cabin
  let query = supabase.from("cabins");

  // A) Create
  if (!id) query = query.insert([{ ...cabin, image: imagePath }]);

  // B) Edit
  if (id) query = query.update({ ...cabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single(); // to return newly created object we use .select().single() take the new element out of the array console.log(error);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  if (hasImagePath) return data;
  // 2) Upload Image to storage supabase
  const { error: uploadError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabin.image);
  // 3) delete the cabin if the image does not upload
  if (uploadError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error(
      "Cabin could not be uploaded and the cabin was not created"
    );
  }
  return data;
}
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}
