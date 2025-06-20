import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTour } from '../services/tourService';
import type { Tour } from '../types/tour';
import ReviewCard from '../components/ReviewCard';
import OverviewBox from '../components/OverviewBox';
import { displayMap } from '../utills/mapBox';
import { useUser } from '../hooks/useUser';
import { bookTour } from '../services/bookingService';


const TourDetailPage: React.FC = () => {

  const { slugAndId } = useParams<{ slugAndId: string }>();
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    if (!slugAndId) return; // Guard: don't run if param is missing

    const fetchTour = async () => {
      const tourId = slugAndId.split('-').pop();
      if (!tourId) {
        console.error('Invalid slugAndId format');
        setLoading(false);
        return;
      }

      try {
        const data = await getTour(tourId);
        console.log(data.imageCover);
        setTour(data);
      } catch (err) {
        console.error('Failed to load tour:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [slugAndId]);

  useEffect(() => {
    if (tour?.locations && document.getElementById('map')) {
      displayMap(tour.locations);
    }
  }, [tour]); 

  if (loading) return <p>Loading tour details...</p>;
  if (!tour) return <p>Tour not found.</p>;
  
  const handleBookTour = async () => {
    await bookTour(tour._id);
    // console.log(tour._id);
  }

  // Convert start date string to formatted date
  const nextDate = new Date(tour.startDates[0]).toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const paragraphs = tour.description?.split('\n') || [];

  return (
    <>
           {/* Header Section */}
           <section className="section-header">
        <div className="header__hero">
          <div className="header__hero-overlay">&nbsp;</div>
          <img
            className="header__hero-img"
            src={`/img/tours/${tour.imageCover}`}
            alt={tour.name}
          />
        </div>

        <div className="heading-box">
          <h1 className="heading-primary">
            <span>{tour.name} tour</span>
          </h1>
          <div className="heading-box__group">
            <div className="heading-box__detail">
              <svg className="heading-box__icon">
                <use xlinkHref="/img/icons.svg#icon-clock" />
              </svg>
              <span className="heading-box__text">{tour.duration} days</span>
            </div>
            <div className="heading-box__detail">
              <svg className="heading-box__icon">
                <use xlinkHref="/img/icons.svg#icon-map-pin" />
              </svg>
              <span className="heading-box__text">
                {tour.startLocation?.description}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="section-description">
        <div className="overview-box">
          <div>
            <div className="overview-box__group">
              <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
              <OverviewBox label="Next date" text={nextDate} icon="calendar" />
              <OverviewBox label="Difficulty" text={tour.difficulty} icon="trending-up" />
              <OverviewBox label="Participants" text={`${tour.maxGroupSize} people`} icon="user" />
              <OverviewBox label="Rating" text={`${tour.ratingsAverage} / 5`} icon="star" />
            </div>

            <div className="overview-box__group">
              <h2 className="heading-secondary ma-bt-lg">Your tour guides</h2>
              {tour.guides.map((guide) => (
                <div className="overview-box__detail" key={guide._id}>
                  <img
                    className="overview-box__img"
                    src={`/img/users/${guide.photo}`}
                    alt={guide.name}
                  />
                  <span className="overview-box__label">
                    {guide.role === 'lead-guide' ? 'Lead guide' : 'Tour guide'}
                  </span>
                  <span className="overview-box__text">{guide.name}</span>
                </div>
              ))}
            </div>
          </div>
          </div>
          <div className="description-box">
            <h2 className="heading-secondary ma-bt-lg">About {tour.name} tour</h2>
            {paragraphs.map((p, i) => (
              <p key={i} className="description__text">
                {p}
              </p>
            ))}
          </div>
       
      </section>

      {/* Pictures Section */}
      <section className="section-pictures">
        {tour.images?.map((img, i) => (
          <div className="picture-box" key={i}>
            <img
              className={`picture-box__img picture-box__img--${i + 1}`}
              src={`/img/tours/${img}`}
              alt={`${tour.name} Tour ${i + 1}`}
            />
          </div>
        ))}
      </section>

      {/* Map Section */}
      <section className="section-map">
        <div id="map"/>
      </section>

      {/* Reviews Section */}
      <section className="section-reviews">
        <div className="reviews">
          {tour.reviews?.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-cta">
        <div className="cta">
          <div className="cta__img cta__img--logo">
            <img src="/img/logo-white.png" alt="Natours logo" />
          </div>
          <img
            className="cta__img cta__img--1"
            src={`/img/tours/${tour.images?.[1]}`}
            alt="Tour picture"
          />
          <img
            className="cta__img cta__img--2"
            src={`/img/tours/${tour.images?.[2]}`}
            alt="Tour picture"
          />
          <div className="cta__content">
            <h2 className="heading-secondary">What are you waiting for?</h2>
            <p className="cta__text">
              {tour.duration} days. 1 adventure. Infinite memories. Make it yours today!
            </p>

            {user ? (
              <button
                className="btn btn--green span-all-rows"
                id="book-tour"
                onClick={handleBookTour}
              >
                Book tour now!
              </button>
            ) : (
              <Link className="btn btn--green span-all-rows" to="/login">
                Log in to book tour
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default TourDetailPage;
