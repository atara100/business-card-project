import Footer from "../components/Footer";
import Title from "../components/Title";

function About() {
    return (
    <>
        <Title
         main="About Page" sub="Here you will find an explanation of how to interface with the app"
        /> 
        <hr className="mx-5" />

        <div className="row w-75 p-3 col position-absolute top-50 start-50 translate-middle mt-5">
            <div className="col d-flex align-items-center ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus maiores amet pariatur 
                voluptatum eligendi distinctio. Recusandae corrupti modi minima vero qui. Officia dolores, 
                quaerat odit earum vero eum esse sequi iure eius aut omnis exercitationem eveniet iusto ipsum provident sed.
            </div>

            <div className="card w-25 p-3 col-md-auto ms-5">
              <img src="https://cdn.pixabay.com/photo/2017/11/27/21/31/computer-2982270_960_720.jpg" className="card-img-top" alt="..."/>
              <div className="card-body">
                 <h5 className="card-title">Business title</h5>
                 <h6 className="card-title">Business description</h6>
                 <hr />
                 <h6 className="card-text"><b>Tel:</b> 050-0000000</h6>
                 <h6 className="card-text"><b>Address:</b> Card Address</h6>
                 <h6 className="card-text"><b>Card Number</b> 00000</h6>
              </div>
            </div>
            <Footer/>
        </div>

        
     </>
     );
}

export default About;