import ImageWithText from "../ImageWithText";
import aboutImage from "../assets/taare-zameen.jpg";

function About() {
  return (
    <>
      <div className="image-text">
        <ImageWithText imageUrl={aboutImage} text="About Us" />
      </div>
      <div className="about">
        <p>
          We are a Technology Company committed to revolutionizing the teaching profession through the application of advanced AI technologies. Our goal is to streamline and enhance teachers' day-to-day activities, empowering them to excel in every aspect of their work. By leveraging AI, we aim to provide teachers with innovative tools and insights that will make their teaching methods smarter, more engaging, and ultimately more impactful for their students. Join us as we shape the future of education.
        </p>
      </div>
    </>
  );
}

export default About;