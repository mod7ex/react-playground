import url from "~/assets/svg/spinner.svg";

interface Props {
    width?: number;
    height?: number;
}

/**
 *
 * @param width 61
 * @param height 61
 * @returns JSX
 */
const Spinner: React.FC<Props> = ({ height, width }) => {
    return <img src={url} alt="spinner" height={height ?? 61} width={width ?? 61} loading="lazy" />;
};

export default Spinner;
