import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './context/Auth';
import { UserContext } from './context/UserContext';
import { auth, db } from './config/firebase';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';

export default function Login() {
  const navigate = useNavigate();
  const users = collection(db, 'users');
  const { authUserData, setauthUserData, update, setUpdate } = useContext(UserContext);
  const { user, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUser(auth.currentUser);
      console.log(authUserData);

      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      const userDocSnap = await getDoc(userDocRef);
      setUpdate(update + 1);

      if (userDocSnap.exists()) {
        console.log('User document exists');
        if (userDocSnap.data().isAdmin) {
          navigate('/admin');
        } else if (userDocSnap.data().isEmployee) {
          navigate('/employee');
        } else {
          navigate('/home');
        }
      } else {
        console.log('User document does not exist');
        setUser(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="gradient-form h-full bg-neutral-200 dark:bg-neutral-700">
      <div className="container h-full p-10">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap">
                {/* Left column container */}
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    {/* Logo */}
                    <div className="text-center">
                      <img className="mx-auto w-48" src="logogeeks.png" alt="logo" />
                      <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">We are GeeksHub</h4>
                    </div>
  
                    <form onSubmit={handleSubmit}>
                      <p className="mb-4">Please login to your account</p>
                      {/* Username input */}
                      <div className="relative mb-4" data-te-input-wrapper-init>
                        <input
                          type="text"
                          className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                          id="exampleFormControlInput1"
                          placeholder="Username"
                        />
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                        >
                          Username
                        </label>
                      </div>
  
                      {/* Password input */}
                      <div className="relative mb-4" data-te-input-wrapper-init>
                        <input
                          type="password"
                          className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                          id="exampleFormControlInput11"
                          placeholder="Password"
                        />
                        <label
                          htmlFor="exampleFormControlInput11"
                          className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                        >
                          Password
                        </label>
                      </div>
  
                      {/* Submit button */}
                      <div className="mb-12 pb-1 pt-1 text-center">
                        <button
                          className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                          type="submit"
                          data-te-ripple-init
                          data-te-ripple-color="light"
                          style={{
                            background:
                              "linear-gradient(to right, #4F46E5, #8B55E0, #4338CA)",
                          }}
                        >
                          Log in
                        </button>
  
                        {/* Forgot password link */}
                        {/* <a href="#!">Forgot password?</a> */}
                      </div>
  
                      {/* Register button */}
                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Don't have an account?</p>
                        <button
                          type="button"
                          onClick={() => navigate('/signup')}
                          className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                          data-te-ripple-init
                          data-te-ripple-color="light"
                        >
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                
                {/* Right column container with background and description */}
                <div
                  className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                  style={{ background: "linear-gradient(to right, #4F46E5, #8B55E0, #4338CA)" }}
                  >
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                  <h4 className="mb-6 text-xl font-semibold">
                    We are more than just a company
                  </h4>
                  <p className="text-sm">
                    "Welcome to GeeksHub! Find your perfect workspace and
                    unleash your productivity. Join our vibrant community of students,
                    professionals, and teams. Start collaborating, learning, and
                    achieving your goals in our modern co-working space."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}  


/*

Title: GeeksHub: Revolutionizing Collaboration and Productivity in Modern Workspaces

Introduction:
In today's fast-paced world, finding the perfect workspace that fosters collaboration, creativity, and productivity is crucial for individuals, teams, and businesses. GeeksHub emerges as a revolutionary project, providing a platform that goes beyond a conventional co-working space. With its vibrant community, cutting-edge infrastructure, and innovative approach, GeeksHub aims to transform the way people work, learn, and achieve their goals.

Unleashing Productivity:
GeeksHub understands that productivity is not solely dependent on physical surroundings; it stems from a harmonious blend of factors. At GeeksHub, professionals, students, and teams converge in an environment designed to fuel inspiration and motivation. The workspace is thoughtfully crafted, featuring ergonomic furniture, ample natural lighting, and modern amenities. These elements contribute to a positive and energizing atmosphere, enhancing focus, creativity, and overall productivity.

Collaboration at its Core:
One of GeeksHub's core strengths lies in its vibrant community. It serves as a melting pot of diverse talents, fostering collaboration and knowledge-sharing. Whether you're a freelancer seeking networking opportunities, a startup looking for potential collaborators, or a student seeking mentorship, GeeksHub provides the ideal platform to connect with like-minded individuals. By facilitating organic interactions, GeeksHub cultivates an environment that nurtures innovation, problem-solving, and professional growth.

State-of-the-Art Infrastructure:
GeeksHub sets itself apart by providing state-of-the-art infrastructure that caters to the evolving needs of modern professionals. High-speed internet, advanced technology solutions, and well-equipped meeting rooms ensure seamless communication and efficient workflows. GeeksHub understands the importance of staying ahead in the digital age and embraces technological advancements to empower its members.

Learning and Development:
GeeksHub believes that learning should be a lifelong journey. Through its various programs, workshops, and events, GeeksHub encourages continuous learning and professional development. Industry experts and thought leaders are invited to share their insights, providing valuable knowledge to the community. GeeksHub also offers mentorship opportunities, allowing individuals to tap into the vast expertise within the community. By fostering a culture of learning, GeeksHub enables its members to stay updated, acquire new skills, and unlock their full potential.

Community Engagement:
GeeksHub goes beyond the conventional workspace model by actively engaging its community members. Regular social events, networking sessions, and collaborative projects create a sense of belonging and camaraderie among the members. GeeksHub believes in the power of a supportive community, where individuals can find inspiration, encouragement, and a network of peers. Through community-driven initiatives, GeeksHub empowers its members to thrive both professionally and personally.

Impact and Future Prospects:
Since its inception, GeeksHub has been making a significant impact on the way people work and collaborate. Its success stories include startups that found their ideal co-founder, professionals who landed new opportunities through networking, and students who gained valuable industry insights. GeeksHub's commitment to innovation and continuous improvement ensures that it remains at the forefront of the evolving workspace landscape.

Looking ahead, GeeksHub envisions expansion into new locations, both locally and globally, to reach a wider audience and facilitate greater collaboration. The project aims to become a beacon of creativity and productivity, where individuals and teams can come together to make a difference in their respective fields. With its user-centric approach, GeeksHub is well-positioned to redefine the future of work and inspire the next generation of innovators.

Conclusion:
GeeksHub represents a paradigm shift in the concept of workspaces. By providing a platform that combines collaboration, productivity, and community engagement, GeeksHub has created an ecosystem that empowers individuals and fosters professional growth. Through its state-of-the-art infrastructure, vibrant community, and commitment to continuous learning, GeeksHub is revolutionizing the way people work, learn, and connect. As it continues to expand its reach and impact, GeeksHub is poised to shape the future of work and redefine the boundaries of what is possible in a collaborative environment.
*/