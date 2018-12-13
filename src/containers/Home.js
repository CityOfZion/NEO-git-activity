import {connect} from 'react-redux'
import * as actions from '../actions'

import React, {Component} from 'react'
import '../index.css'
import Repo from '../components/Repo'
import Commit from '../components/Commit'
import UserCard from '../components/UserCard'
// import Timer from '../components/Timer'
import Octicon, {MarkGithub} from '@githubprimer/octicons-react'
import { filterArray } from '../helper/filter'
import { users, TIME_INTERVAL, MAX_PROJECTS_COUNT, MAX_COMMITS_COUNT } from '../helper/constants'
// React component
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            commits: [],
            users:[],
            current_time:"CurrentTime"
        }
        this.getProjects = this.getProjects.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(actions.getUsersInfo(users));
        this.getProjects()
        this.timer = setInterval(this.getProjects, TIME_INTERVAL);
    }
    componentWillUnmount(){
        clearInterval(this.timer);
    }
    getProjects(){
        this.setState({current_time: Date()})
        this.props.dispatch(actions.getProjects(users));
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.users !== nextProps.users) { 
            this.setState({
                users: nextProps.users
            });
          }
        if (this.props.projects !== nextProps.projects) { 
          this.setState({
            projects: filterArray(nextProps.projects, "updated_at", "DESC", MAX_PROJECTS_COUNT),
          });
        }
        if (this.props.commits !== nextProps.commits) { 
            this.setState({
                commits: filterArray(nextProps.commits,"commit_date","DESC", MAX_COMMITS_COUNT),
            });
            // console.log(filterArray(nextProps.commits,"commit_date","DESC", MAX_COMMITS_COUNT));
        }        
    }

    render() {
        let isloading = this.props.project_isloading || this.props.commit_isloading
        return (
            <div>
                <header className="Header">
                    <div className="container">
                        <Octicon icon={MarkGithub} size='medium' verticalAlign='middle' />
                        <span className="title">&nbsp;&nbsp; State of NEO &nbsp;&nbsp;</span>
                    </div>
                </header>
                <div className="container">
                    <div className="col-xs-12 col-sm-8">
                        <br/>
                        <div className="row">
                        {
                            this.state.users && this.state.users.map((user, index)=>{
                                return <UserCard key={index} data={user}></UserCard>
                            })
                        }
                        </div>

                        <h4 className="subtitle"><span>Last active projects</span></h4>
                        <div className="row reposlist">
                        {
                            isloading===false?
                            this.state.projects && this.state.projects.map((project, index)=>{
                                return <Repo key={index} data={project}></Repo>
                            }):[...Array(10)].map((_,index) => {
                                return <Repo key={index}></Repo>
                            })
                        }
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-4">
                        <h4 className="subtitle"><span>Recent commits to master branches</span></h4>
                        {/* <div className="commit-group-title">Commits on Sep 28, 2018</div> */}
                        <div className="commitslist">
                        {
                            isloading === false?
                            this.state.commits && this.state.commits.map((commit, index)=>{
                                return <Commit key={index} data={commit}></Commit>
                            }):[...Array(10)].map((_, index) => {
                                return <Commit key={index}></Commit>
                            })                        
                        }
                        </div>
                    </div>
                    {/* <Timer myfunction={this.getProjects}></Timer> */}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        projects: state.Project.list,
        users: state.User.list,
        commits: state.Commit.list,
        project_isloading: state.Project.isloading,
        commit_isloading: state.Commit.isloading,
    }
}

export default connect(mapStateToProps)(Home);
