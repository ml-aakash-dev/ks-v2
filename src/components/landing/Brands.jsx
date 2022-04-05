import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import content from '../../assets/data/vericalcards.js'
import {gsap} from "gsap"
import { ScrollTrigger } from "gsap/all";
import { Link } from "react-router-dom";
gsap.registerPlugin(ScrollTrigger)

const Brands = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [inView,setInView] = useState(false)
  const slider = useRef(null);
 let navSlider = useRef(null)

 const container = useRef()
 let timeline= gsap.timeline({paused:true,defaults:{duration:"1s"}})
 useEffect(()=>{
  ScrollTrigger.create({
      trigger:container?.current,
      start:  "250px bottom",
      onEnter: ()=>{
        timeline.play()
          container?.current?.querySelector('.BrandContent').classList.add('animate')

        setInView(true)
      }
  })
},[])
  const slideRight =()=>{
    let scrolled
    nextSlide()
    if(currentSlide<12){
      scrolled =  navSlider.current.scrollLeft
      navSlider.current.scrollTo(scrolled + 150,0)
    }else{
      scrolled= 0
      navSlider.current.scrollTo(scrolled ,0)
    } 
  }
  const slideLeft =()=>{
    let scrolled
    prevSlide()
    if(currentSlide!==0){
      scrolled =  navSlider.current.scrollLeft
      navSlider.current.scrollTo(scrolled - 150,0)
    }else{
      scrolled= 150 * 12
      navSlider.current.scrollTo(scrolled ,0)
    }
 }
  useEffect(() => {
    let interval
    if(inView){

    interval= setInterval(() => {
        slideRight()
      }, 5000000);
    }
    return () => clearInterval(interval);
  }, [currentSlide,inView]);

  useEffect(()=>{
         timeline.fromTo('#Brands',{autoAlpha:0},{autoAlpha:1})
         
  },[])
 
  let imgs=[]
  content.forEach(item=>imgs.push(item.img))

  const nextSlide = () => {
    let scroll = currentSlide < 12 ? currentSlide + 1 : 0;
    slider.current.style.transform = `translateX(-${scroll * 7.7}%)`;
    let navSlides = document.querySelectorAll(".BrandNavSlide");
    let brandSlides = document.querySelectorAll(".BrandSlide");
    navSlides.forEach((slide) => slide.classList.remove("active"));
    brandSlides.forEach((slide) => {
      slide.querySelector(".BrandContent").classList.remove("animate");
    });
    brandSlides[currentSlide < 12 ? currentSlide + 1 : 0]
      .querySelector(".BrandContent")
      .classList.add("animate");
    document
      .getElementById(imgs[currentSlide < 12 ? currentSlide + 1 : 0])
      .classList.add("active");
    setCurrentSlide((prev) => (prev != 12 ? prev + 1 : 0));
  };
  const prevSlide = () => {
    let scroll = currentSlide !== 0 ? currentSlide - 1 : 12;
    slider.current.style.transform = `translateX(-${scroll * 7.7}%)`;
    let navSlides = document.querySelectorAll(".BrandNavSlide");
    let brandSlides = document.querySelectorAll(".BrandSlide");
    navSlides.forEach((slide) => slide.classList.remove("active"));
    brandSlides.forEach((slide) => {
      slide.querySelector(".BrandContent").classList.remove("animate");
    });
    brandSlides[currentSlide !== 0 ? currentSlide - 1 : 12]
      .querySelector(".BrandContent")
      .classList.add("animate");
    document
      .getElementById(imgs[currentSlide !==0  ? currentSlide - 1 : 12])
      .classList.add("active");
    setCurrentSlide((prev) => (prev !== 0 ? prev - 1 : 12));
  };
  const slideTo = (slideNum) => {
    
    let brandSlides = document.querySelectorAll(".BrandSlide");
    brandSlides.forEach((slide) => {
      slide.querySelector(".BrandContent").classList.remove("animate");
    });
    brandSlides[slideNum].querySelector('.BrandContent').classList.add('animate')
    setCurrentSlide(slideNum);
    document
      .querySelectorAll(".BrandNavSlide")
      .forEach((slide) => slide.classList.remove("active"));
    document.getElementById(imgs[slideNum]).classList.add("active");
    slider.current.style.transform = `translateX(-${slideNum * 7.7}%)`;
    slider.current.style.transform= `translateX(-${slideNum * 7.7}%)`
  };

  return (
    <div ref={container} id='Brands' className="Brand">
      <div ref={slider} className="BrandSlider">
        {content.map((item) => (
          <div key={item.img} className="BrandSlide">
            <div className="BrandContent ">
              <span className="BrandBadge">Our Companies</span>
              <h1>
                {item.heading} 
                <Link to={'/verticals' +item.heading}>
                    <svg   enableBackground="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512"><g><path d="m472 452c0 11.028-8.972 20-20 20h-392c-11.028 0-20-8.972-20-20v-392c0-11.028 8.972-20 20-20h176v-40h-176c-33.084 0-60 26.916-60 60v392c0 33.084 26.916 60 60 60h392c33.084 0 60-26.916 60-60v-176h-40z"></path><path d="m312 0v40h131.716l-321.858 321.858 28.284 28.284 321.858-321.858v131.716h40v-200z"></path></g></svg>
                </Link>
              </h1>
               
{ item.slogan[0]
 ?

<p className='brand_tagline'>
{  item.slogan} 
              </p>
: <p>
                 {item.des}
              </p> }
              <div className="Brands_Btn_Group">
             { item.link &&
                <a target="_blank" href={item.link}>
                    <button className='Brands_PrimaryBtn'>
                      Visit Website 
                    </button> 
                </a>
                    }
               {/* <Link to={item.joinBtn  !== 'Be A Managing Partner'? '/jobapplication23': '/partner_application'}>
                <button className='Brands_PrimaryBtn Brands_PrimaryFilledBtn'>
                 {item.joinBtn}
                </button>
              </Link>
 */}
            { item.slogan[0] &&   <Link to={`/verticals${item.heading}`}>
                <button className='Brands_PrimaryBtn Brands_PrimaryFilledBtn'>
                  Read More
                </button>
                </Link>}
              </div>
            </div>
            {item.mobImg?
            <picture>
              <source srcSet={item.mobImg} media="(max-width:600px)" />
              <source  srcSet={item.img} media="(min-width:600px)"/>
              <source srcSet={item.img} media="(max-width:820px)  and (max-height:600px)"/>
              <img src={item.img} alt="" />
            </picture>
            :

            <img src={item.img} alt="" />}
          </div>
        ))}
      </div>
      <div className="BrandSliderNav">
          <i onClick={slideLeft} className="fa fa-long-arrow-alt-left"></i>       
          <div ref={navSlider} className='brandSlidesContainer'> 
          
          {content.map((item, index) => (
              <div
              onClick={() => slideTo(index)}
              key={item.img + item.heading}
              id={item.img}
              data-text={ item.heading}
              className={`BrandNavSlide ${index === 0 && " active"}`}
              >
                <img src={item.img} alt="" />
              </div>
            ))}
        </div>
            <i onClick={slideRight} className="fa fa-long-arrow-alt-right"></i>       
      
      </div>
    </div>
  );
};

export default Brands;
