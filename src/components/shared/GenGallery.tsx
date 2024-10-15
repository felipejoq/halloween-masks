---
import {ImageWithLoading} from "./ImageWithLoading";
interface Props {
    face_masks: string[];
    aspectRatio: string;
}
const {face_masks, aspectRatio} = Astro.props;
const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    console.log('click');
};
---

<div class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-3 gap-4">

    {
        face_masks.map((face: string) => (
                <div>
                    <ImageWithLoading src={face} aspectRatio={aspectRatio} client:only="react"/>
                </div>
        ))
    }
</div>