import React from "react";
import Navbar from './Navbar'
import Footer from './Footer'
// import AboutBanner from ''

const About = () => {
  return (
    <>
      <Navbar />
      {/* <img className="AboutBanner" src={AboutBanner} alt="" /> */}
      <div className="AboutBanner">
        <h1 className="text-center text-white">About us</h1>
      </div>
      <div className="container my-5">
        <p className="text-center">Studology.com is a free website, trusted by thousands of students and teachers, throughout the world.<br />
          We are not the biggest, but we care the most. Even though you will visit other websites for similar services, we want you to remember us and tell your friends about us. We put the work to be that awesome for you.</p>
        <h3 className="text-center">Mission</h3>
        <p className="text-center">To make every teacher searchable in the world in their local area and online. To keep the website free for teachers and students. To provide students with a teacher within 24 hours of posting their requirements.</p>
        <h3 className="text-center">Our commitment to you</h3>
        <p className="text-center">Your data is never shared or sold to anyone without your permission. You will never be spammed.<br />

          You can expect continuous improvement in the software, quick action on your feedback, with ever-increasing features and more chances for what you want, whether it's tutors or teaching jobs.</p>
        <h3 className="text-center">Nitpicky details - why things are the way they are</h3>
        <p className="text-center">Our "North Star" has always been what's good for the students and what's good for the teachers. At times, what students want and teachers want are opposite. Even if they both want the same thing, external factors such as spamming by marketers, overzealous teachers, and new businesses which are trying to acquire customers become overwhelming.<br />

          An example of this is that students want the contact details of teachers. In tutorindia.net, we made contact details public. However, with that, we have a lot of people spamming making marketing calls and miscreants making lewd comments to female teachers as contact details were easily visible. That's just the tip of the iceberg. Also, some students got hundreds of calls (not exaggerating) for a requirement they posted which was very annoying.<br />

          Therefore, we aimed to design a system that, even though is free for normal users, has enough cost of engagement so to deter the spammers and miscreants.<br />

          We took a couple of actions to make this happen - and some very interesting results came out:<br />

          Holding our teachers to a higher standard - We collect a lot of details from the teachers before they can start with us. 46% of teachers don't complete their profile form itself. That leaves us with sincere teachers who are willing to put the time to make their profile awesome - as they realize that this is a long-term one-time investment.<br />

          Teachers have to write a minimum description of 100 words about them and their teaching methodology etc. Even though that's not much, our research tells us that most people would have stopped at 40 words or less if we hadn't made a minimum of 100 words mandatory. What's even more surprising is that teachers do have things to say - things that can prompt a student to contact them - things that make them stand apart. When we force them to think, teachers come up with brilliant things about themselves. This is unlike most other websites that allow teachers to complete profiles with the bare minimum data just so the website can say that they have these many tutors.<br />

          Lesson learned - If we dumb things down, people will do dumb things. If you expect higher quality and hold them to a high standard, people do rise to the challenge and do great things.<br />

          Use for free but respect others -  We wanted to keep the website free but without any cost of contacting, it just didn't appear to be possible. So we kept it so that students can contact three tutors for free and have to pay if they wish to contact more teachers. Similarly, teachers can also be contacted by students at no cost to them and some jobs are free to apply as well.<br /></p>
      </div>
      <Footer />
    </>
  );
};

export default About;
