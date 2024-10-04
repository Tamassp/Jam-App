import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg'
import { usePDF } from '../context/PDFContext'
export interface EditIconProps {
    width?: number;
    height?: number;
}

const EditIcon = ({
    width = 32,
    height = 32,
}: EditIconProps): JSX.Element => {
    const { isPDFView } = usePDF();
    if(isPDFView) return null
    return (
        <Svg width={width} height={height} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <G clipPath="url(#clip0_397_1237)">
            <Path fillRule="evenodd" clipRule="evenodd" d="M16 9.9048C16 9.3669 16.1152 8.38099 16.2944 8.38099H0V11.4286H16.2944C16.1152 11.4286 16 10.4427 16 9.9048ZM28.5056 8.38099C27.8448 6.85718 26.0864 5.33337 24 5.33337C21.3488 5.33337 19.2 7.37985 19.2 9.9048C19.2 12.4298 21.3488 14.4762 24 14.4762C26.0864 14.4762 27.8448 12.9524 28.5056 11.4286H32V8.38099H28.5056ZM16 22.0953C16 22.6332 15.8848 23.1406 15.7056 23.6191H32V20.5715H15.7056C15.8848 20.5715 16 21.5574 16 22.0953ZM12.8 22.0953C12.8 24.6202 10.6512 26.6667 8 26.6667C5.9136 26.6667 4.1552 25.1429 3.4944 23.6191H0V20.5715H3.4944C4.1552 19.0477 5.9136 17.5238 8 17.5238C10.6512 17.5238 12.8 19.5703 12.8 22.0953Z" fill="black" />
        </G>
        <Defs>
            <ClipPath id="clip0_397_1237">
            <Rect width="32" height="32" fill="white" />
            </ClipPath>
        </Defs>
        </Svg>



    )
}


export default EditIcon;


