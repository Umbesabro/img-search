export type Image = { urls: { small: string } };

export function Images({ images }: { images: Array<Image> }) {
  return (<div className='images'>
    {images.length !== 0 ? images.map(img => (<img src={img.urls.small} />)) : null}
  </div>)
}