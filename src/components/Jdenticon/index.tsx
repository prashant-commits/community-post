import jdenticon from "jdenticon/standalone";
import React, { SVGProps, useEffect, useRef } from "react";

// jdenticon.configure({
//     hues: [207],
//     lightness: {
//         color: [0.84, 0.84],
//         grayscale: [0.84, 0.84]
//     },
//     saturation: {
//         color: 0.48,
//         grayscale: 0.48
//     },
// });

type JdenticonProps = {
    value: string,
    size: number,
} & SVGProps<SVGSVGElement>;

const Jdenticon: React.FC<JdenticonProps> = ({ value, size, ...svgProps }) => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (svgRef.current) {
            const svgString = jdenticon.toSvg(value, size);
            svgRef.current.innerHTML = svgString;
        }
    }, [value, size]);

    return <svg ref={svgRef} width={size} height={size} {...svgProps}/>;
};

export default Jdenticon;