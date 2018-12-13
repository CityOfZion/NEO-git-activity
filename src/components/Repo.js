import React, {Component} from 'react'
import TimeAgo from 'react-timeago'
import Skeleton from 'react-loading-skeleton';
import Octicon, {getIconByName} from '@githubprimer/octicons-react'

class Repo extends Component {
    constructor(props) {
        super(props);
        this.state={flag: true}
    }

    getLanguageColor(language){
        switch(language){
            case "JavaScript":
                return "repo-language-javascript repo-language-color";
            case "C#":
                return "repo-language-csharp repo-language-color";
            case "Shell":
                return "repo-language-shell repo-language-color";
            case "Python":
                return "repo-language-python repo-language-color";
            case "Go":
                return "repo-language-go repo-language-color";
            case "HTML":
                return "repo-language-html repo-language-color";
            default:
                return "repo-language-default repo-language-color";
        }
    }
    render() {
        let repo = this.props.data
        return (
            repo?<div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                <div className="repo">
                    <h3><a href={repo.html_url}>{repo.name}</a></h3>
                    <p><a href={repo.owner.html_url} className="owner" >{repo.owner.login  || <Skeleton/>}</a></p>
                    <div className="info text-gray">
                        <span className={this.getLanguageColor(repo.language)} ></span><span className="mr-3"> {repo.language}</span>
                        {repo.stargazers_count?<a className="mr-3"><Octicon icon={getIconByName("star")}/> {repo.stargazers_count}</a>:null}
                        {repo.forks_count?<a className="mr-3"><Octicon icon={getIconByName("git-branch")}/> {repo.forks_count}</a>:null}
                        {repo.license?<a className="mr-3"><Octicon icon={getIconByName("law")}/> {repo.license.spdx_id}</a>:null}
                        <span>Updated <TimeAgo date={repo.updated_at}/></span>
                    </div>
                </div>
            </div>:<div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                <div className="repo">
                    <h3><a>{<Skeleton/>}</a></h3>
                    <h5><a>{<Skeleton/>}</a></h5>
                    <div className="text-gray">
                        {<Skeleton/>}
                    </div>
                </div>
            </div>
        )
    }
}

export default Repo