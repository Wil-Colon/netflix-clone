const ArrowRight = (props) => (
    <button {...props} className={'next'}>
        <i className="fas fa-chevron-right"></i>
    </button>
);

const ArrowLeft = (props) => (
    <button {...props} className={'prev'}>
        <i className="fas fa-chevron-left"></i>
    </button>
);

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6.5,
    slidesToScroll: 4,
    arrows: true,
    nextArrow: <ArrowRight />,
    prevArrow: <ArrowLeft />,
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 5.5,
                slidesToScroll: 3,
                infinite: true,
                dots: false,
            },
        },
        {
            breakpoint: 1000,
            settings: {
                slidesToShow: 3.5,
                slidesToScroll: 3,
                infinite: true,
                dots: false,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2.5,
                slidesToScroll: 2,
                infinite: true,
                dots: false,
            },
        },
    ],
};

export default settings;
