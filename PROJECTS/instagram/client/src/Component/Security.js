import React,{useRef,useEffect} from 'react';
import M from 'materialize-css'
export default function Security() {

    const Search=useRef(null);
    useEffect(()=>{

        M.Modal.init(Search.current)
    },[])

  return (
  <>
  
  <h4>Leechi <i class="material-icons" style={{color:"blue"}}>security</i></h4>
  
  
  <div class="panel-group" id="accordion">
  <div class="panel panel-default">
    <div class="panel-heading">
      <h4 class="panel-title" style={{fontFamily:"cursive",}}>
        <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">
        We provides security or not?</a>
      </h4>
    </div>
    <div id="collapse1" class="panel-collapse collapse in">
      <div class="panel-body">
      <h5 style={{fontFamily:"cursive",fontWeight:"700",letterSpacing:"2px"}}>
     <p>We provides best security,on this </p>

    <p> website which is running  on </p>
     <p>latest Technolgy where no can </p>
    <p> breach
      your dataset or trackanyone.</p>
      </h5>
    </div>
    </div>
  </div>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h4 class="panel-title">
        <a data-toggle="collapse" data-parent="#accordion" href="#collapse2">
    How we provide Secuirty?</a>
      </h4>
    </div>
    <div id="collapse2" class="panel-collapse collapse">
      <div class="panel-body">
      <h5 style={{fontFamily:"cursive",fontWeight:"800"}}>
   <p> 1.We use the method of hashing
   <br></br> Techniques <span style={{color:"blue",letterSpacing:"2px"}}>🔑</span>
   </p><p>
    2.refreshing techniques.</p>
    <p>
    3.centralized system.
    </p>
  <p>
    4.others things, we cannot reveal for 
    <br></br>security purpose.
    </p>
    </h5>
      </div>
    </div>
  
  </div>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h4 class="panel-title">
        <a data-toggle="collapse" data-parent="#accordion" href="#collapse3">
        Functionality with Security</a>
      </h4>
    </div>
    <div id="collapse3" class="panel-collapse collapse">
      <div class="panel-body">
        <h5 style={{fontFamily:"cursive",fontWeight:"700",letterSpacing:"2px"}}>
        <p>1.upload the post with protection.
        </p>
    <p>
        2.like the post  with protection.
        </p>
        <p> 3.unlike the post  with protection

        </p>
        <p>
        4.follow/unfollow  with protection.
        </p>
        <p>
        5.message send  with protection.
        </p>
        </h5>      
      </div>
    </div>
  </div>
</div>
<br>
</br>
<br></br>
<div id="collapse2" class="panel-collapse collapse">
<div class="panel-body">
<h1>FAQ</h1>
<h5 style={{fontWeight:"900",letterSpacing:"2px"}}>
<p style={{wordSpacing:"5px"}}>Q. How to send Messages? <br></br>
Ans. goto his/her profile and  send message privately.
</p>
<p style={{wordSpacing:"5px"}}>
Q. How to view all Messages?
<br></br>
Ans.goto your own profile and  click on
view message and get all messages.
</p>
<p  style={{wordSpacing:"5px"}}>
Q. if you want to realtime chat?<br></br>
Ans. Then, we provide a tunnel secrete chat app
where you can chat with others
<br></br>
<a href="https://secretechat.herokuapp.com/">Secrete Chat app</a>
</p>
</h5>

</div>
</div>
<br></br>
 <a class="waves-effect waves-light btn modal-trigger" href="#modal1"
 style={{marginBottom:"100px"}}
 >Privacy Policy</a>

<div id="modal1" class="modal" style={{position:"absolute",top:"300px",left:"0px",
}} ref={Search}
>

    <div class="modal-content" >
    <h1>Privacy Policy</h1><h6>
    Privacy Policy for Leechi
    At Leechi, accessible from url given one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Leechi and how we use it.
    
    If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us through email at rajeevupadhyay608@gmail.com
    
    Log Files
    Leechi follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
    
    Cookies and Web Beacons
    Like any other website, Leechi uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
    
    Google DoubleClick DART Cookie
    Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – https://policies.google.com/technologies/ads
    
    Privacy Policies
    You may consult this list to find the Privacy Policy for each of the advertising partners of Leechi Our Privacy Policy was created with the help of the Privacy Policy Generator.
    
    Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Leechi, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
    
    Note that Leechi has no access to or control over these cookies that are used by third-party advertisers.
    
    Third Party Privacy Policies
    Leechi Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options. You may find a complete list of these Privacy Policies and their links here: Privacy Policy Links.
    
    You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites. What Are Cookies?
    
    Children's Information
    Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
    
    Leechi does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
    
    Online Privacy Policy Only
    This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Leechi This policy is not applicable to any information collected offline or via channels other than this website.
    
    Consent
    By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.</h6>
    
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
    </div>
    <br>
    </br>
    <br></br>
  </div>
  </>)
}

