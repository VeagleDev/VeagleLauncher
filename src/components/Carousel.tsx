import { Link } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react';
import Icon from './Icon';
import downloadI from '../assets/icons/download.txt'

// Data
import data from '../data.json';

const Carousel = () => {
    const maxScrollWidth = useRef(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const carousel = useRef(null);

    const movePrev = () => {
        if (currentIndex > 0) {
          setCurrentIndex((prevState) => prevState - 1);
        }
    }

    const moveNext = () => {
        if (
          carousel.current !== null &&
          carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
        ) {
          setCurrentIndex((prevState) => prevState + 1);
        }
    }

    const isDisabled = (direction:any) => {
        if (direction === 'prev') {
          return currentIndex <= 0;
        }
    
        if (direction === 'next' && carousel.current !== null) {
          return (
            carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
          );
        }
    
        return false;
    }

    useEffect(() => {
        if (carousel !== null && carousel.current !== null) {
          carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
        }
    }, [currentIndex]);

    useEffect(() => {
        maxScrollWidth.current = carousel.current
          ? carousel.current.scrollWidth - carousel.current.offsetWidth
          : 0;
    }, []);

  return (
    <div className="carousel ml-[82px] mb-70 -translate-y-2/3">
        <p className="mb-2">Jeux populaire</p>
        <div className="flex justify-between absolute top left w-full h-full overflow-auto">
            <button 
            onClick={movePrev}
            className="flex justify-center items-center h-[170px] w-30 z-10 bg-gradient-to-r from-black-trans to-transparent rounded-xl"
            disabled={isDisabled('prev')}
            >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                />
                </svg>
            </button>
            <button 
            onClick={moveNext}
            className="flex justify-center items-center h-[170px] w-30 z-10 bg-gradient-to-l from-black-trans to-transparent rounded-xl"
            disabled={isDisabled('next')}
            >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                />
                </svg>
            </button>
        </div>
        <div 
        ref={carousel}
        className="carousel-container relative flex gap-3 h-[170px] scroll-smooth overflow-hidden"
        >

            {data.resources.map((resource) => {
                return(
                    <Link to="/Game" className="carousel-item inline-block" state={{ key: resource}}>
                        <div 
                        className="w-cell h-full bg-orange rounded-xl flex justify-between items-end pb-10 px-10 bg-no-repeat bg-cover bg-top overflow-hidden
                        group"
                        style={{ backgroundImage: `url(${resource.background || ''})` }}
                        >
                          <div className="rounded-full bg-orange p-1 shadow-xl translate-y-[140%] group-hover:-translate-y-0 transition-all duration-500">
                            <Icon path={downloadI} color="#FFFFFF"/>
                          </div>

                          <p className="relative after:absolute after:-mb-10 after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-orange translate-y-[120%] group-hover:-translate-y-0 transition-all duration-500 delay-200">
                            {resource.name}
                          </p>
                        </div>
                    </Link>
                );
            })}
        </div>
    </div>
  )
}

export default Carousel;