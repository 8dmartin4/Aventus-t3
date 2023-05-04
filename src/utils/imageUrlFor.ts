import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "./sanity";

const imageBuilder = imageUrlBuilder(sanityClient);

const imageUrlFor = (source: any) => imageBuilder.image(source);

export default imageUrlFor;