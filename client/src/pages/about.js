import React, { Component } from 'react'
import yl from './../img/yl.jpg'
import sz from './../img/sz.jpg'
import ww from './../img/ww.jpg'
import yw from './../img/yw.jpg'
import px from './../img/px.jpg'
import bug from './../img/bug.jpg'

//Class of person
class Person extends Component {

  render () {
    return (
      <div className='column'>
        <div className='card'>
          <a href={this.props.website}>
            <img
              src={this.props.img}
              className='card-img-top'
              height='450'
              width='225'
              object-fit='cover'
              alt=''
            />
          </a>

          <div class="container">
            <h2 className='card-title mb-0'>{this.props.name}</h2>
            <p><large>{this.props.bio}</large></p>

            <div className='card-text text-black-50'>
            <b>Number of Issues:</b> {this.props.issues}
            </div>
            <p>
            </p>

            <div className='card-text text-black-50'>
            <b>Number of Commits:</b> {this.props.commits}
            </div>
            <p>
            </p>

            <div className='card-text text-black-50'>
            <b>Number of Tests:</b> {this.props.tests}
            </div>
            <p>
            </p>
            <p>
            <b>Responsibilities:</b> {this.props.role}
            </p>
          </div>

        </div>
      </div>
    )
  }
}

// create about to store each person's data
class About extends Component {
  constructor (props) {
    super(props)

    this.state = {}
    this.state.memData = {
      'Pengdi Xia': {
        name: 'Pengdi Xia',
        bio: 'I am a senior currently pursuing a master degree in MSITM at McCombs',
        alias: ['Pengdi Xia'],
        role: 'Setting up GCP server. Backend development. Database design.',
        img: px,
        commits: 0,
        issues: 0,
        tests: 12
      },
      'Shijing Zhong': {
        name: 'Shijing Zhong',
        bio: 'I am an Integrated Master student at CSEM and a Christian. And I love music.',
        alias: ['Shijing Zhong'],
        role: 'Setting up GCP server. Postman. Writing technical report.',
        img: sz,
        commits: 0,
        issues: 0,
        tests: 15
      },
      'Wenyuan Wu': {
        name: 'Wenyuan Wu',
        bio: 'I am a super senior at UT. I love playing phone games and solving Rubik\'s Cube.',
        alias: ['Wenyuan Wu'],
        role: 'Setting up GitLab slack integration, Front End. Search.',
        img: ww,
        commits: 0,
        issues: 0,
        tests: 5
      },
      'Yige Wang': {
        name: 'Yige Wang',
        bio: 'Hi, I am Yige. I am a senior and future Googler and I love puppies.',
        alias: ['Yige Wang'],
        role: 'Front End and website stylist. Filter.',
        img: yw,
        commits: 0,
        issues: 0,
        tests: 12
      },
      'Yaoyang Liu': {
        name: 'Yaoyang Liu',
        bio: 'I am Yaoyang. I like software engineering very much.',
        alias: ['Yaoyang Liu'],
        role: 'Project architect. Postman. QA. Technical Report.',
        img: yl,
        commits: 0,
        issues: 0,
        tests: 72
      },
      'Duck': {
        name: 'Duck',
        bio: 'I am a energetic duck that did all the work. Everybody else is lying. (Total Stats Here)',
        alias: ['Duck'],
        role: 'Fullstack',
        img: bug,
        commits: 0,
        issues: 0,
        tests: 0
      },
    }
  }


// Fetch data from gitlab api
// calculate the total number of commits/ issues for each contributor
componentDidMount (){
  for (var page = 1; page < 3; page ++) {
    fetch(
      'https://gitlab.com/api/v4/projects/11032527/repository/commits?per_page=100&page='+page
    )
      .then(response => response.json())
      .then(data => {
        // process the data
        for (var i in data) {
          let commit_data = data[i]
          for (var member in this.state.memData) {
            // console.log(member);
            if (this.state.memData[member].alias.includes(commit_data.author_name)) {
              this.state.memData[member].commits += 1;
              this.state.memData['Duck'].commits += 1;
            }
          }
        }
        this.setState({})
      })
      .catch(e => {
        console.log(e)
      })
  }


  fetch('https://gitlab.com/api/v4/projects/11032527/issues?per_page=100&page=1')
    .then(issues => issues.json())
    .then(issues => {
      for (var i in issues) {
        let data = issues[i]
        for (var member in this.state.memData) {
          if (this.state.memData[member].alias.includes(data.author.name)) {
            this.state.memData[member].issues += 1;
            this.state.memData['Duck'].issues += 1;
          }
        }
      }
      for (member in this.state.memData) {
        if (member !== 'Duck') {
          this.state.memData['Duck'].tests += this.state.memData[member].tests;
        }
      }
      this.setState({})
    })
    .catch(e => {
      console.log(e)
    })
  }
  

  // Final Render
  render () {
    let components = []
      for (let mem in this.state.memData) {
      components.push(
        <div id={mem} className='col-xl-4 col-md-6 mb-4'>
          <div className='card border-0 shadow'>
            <Person {...this.state.memData[mem]} />
          </div>
        </div>
      )
    }

    return (
      <div className='main' style={{ marginTop: '10vh' }}>
        {/* display intro*/}
        <section class = "jumbotron text-center">
          <div class = "container">
              <h1 class = "jumbotron-deading">Energenius</h1>
              <p class = "lead text-muted">
                  "The energy decision for each resident is critical to the environment, economics and even security for the whole society. Nowadays with relatively abundant energy resource, the public rarely realizes the impact of excessive use of specific energy before it is too late.
                  Our website aims to provide clean data to help each person to make a better decision on their energy consumptions. We will quantify the environmental impact of most new and traditional energies, and advise the public on using and saving energy for different purposes. With the educational mission, the website will provide insights into the development of future energy to inspire more civic engagement and achieve energy reform.
                  The future quality of life is dependent on today’s energy use. Improving public awareness of energy reform is essential for building a better future ."
              </p>
              <p>
                  <a href="https://gitlab.com/LuculentDig/energiziousness" class="btn btn-primary my-2">Gitlab</a>
                  <div></div>
                  <a href="https://documenter.getpostman.com/view/6823871/S11NMwp4" class="btn btn-primary my-2">Our API</a>
              </p>
          </div>
        </section>

        {/* display group members */}
        <div className='container'>
          <div className='row justify-content-center'>{components}</div>
        </div>
        <div className='row justify-content-center row-eq-height' >
        <div className='card-body text-center'>
          <h5 className='card-title mb-0'>{this.props.name}</h5>
          <h10 className='card-title mb-0'>{this.props.bio}</h10>
          <div className='card-text text-black-50'>{this.props.role}</div>
        </div>
        </div>

        {/* display tool used */}
        <div class = "container">
            <h1 class = "jumbotron-deading">Tools Used</h1>
            <ul>
                <li><b>GitLab:</b> Gitlab CI was deployed for autonomous testing for each Gitlab commit. </li>
                <li><b>Google Cloud Platform:</b> Google App Engine is the main service we used for the website’s backend environment.</li>
                <li><b>Postman:</b> Postman was used to displaying our API function and testing the API calls.</li>
                <li><b>Bootstrap:</b> We use React-Bootstrap as the CSS framework for our React application.</li>
                <li><b>Grammarly:</b> Grammarly was used for documentation grammar and spelling checkings.</li>
                <li><b>Brackets:</b> Brackets was the IDE we used for most of our development. </li>
            </ul>
        </div>

        {/* display apis */}
        <div class = "container">
            <h1 class = "jumbotron-deading">API Used</h1>
            <ul>
                <li><b>Energy Information</b> <a href="https://www.eia.gov/opendata/">https://www.eia.gov/opendata/</a> <a href="https://openei.org/services/">https://openei.org/services/</a></li>
                <li><b>Production and Country Information</b> <a href="https://en.wikipedia.org/api/rest_v1/">https://en.wikipedia.org/api/rest_v1/</a></li>
                <li><b>Video Media</b> <a href="https://developers.google.com/youtube/v3/">https://developers.google.com/youtube/v3/</a></li>
            </ul>
        </div>


      </div>
    )
  }

}

export default About
