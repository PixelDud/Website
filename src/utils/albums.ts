export async function getAlbumImages(albumId: string) {
    let images = import.meta.glob<{ default: ImageMetadata }>(
        ["/src/content/albums/**/*.{jpeg,jpg,png}", "!/src/content/albums/**/cover.{jpeg,jpg,png}"]
    );

    images = Object.fromEntries(
        Object.entries(images).filter(([key]) => key.includes(albumId))
    );

    const resolvedImages = await Promise.all(
        Object.values(images).map((image) => image().then((mod) => mod.default))
    );

    return resolvedImages;
}