import React, {Component} from 'react'
import TimeAgo from 'react-timeago'
import Skeleton from 'react-loading-skeleton';
class Commit extends Component {
    messageFilter(message){
        if (message.length>30)
            return message.slice(0, 40) + "..."
        return message 
    }
    render() {
        let commit = this.props.data
        let default_avatar_url = 'https://camo.githubusercontent.com/e2dda5260d9ac179033d7ac958cc1bd689c913ac/68747470733a2f2f302e67726176617461722e636f6d2f6176617461722f64333032653663663435343566393636616364353566353765353331643365323f643d68747470732533412532462532466173736574732d63646e2e6769746875622e636f6d253246696d6167657325324667726176617461727325324667726176617461722d757365722d3432302e706e6726723d6726733d3430'
        return (
            this.props.data?<div className="col-xs-12 commit-div">
                <div className="commit">
                    <p className="repo-title"><a href={commit.repo.html_url}>{commit.repo.name}</a> / <a href={commit.repo.owner.html_url}>{commit.repo.owner.login}</a></p>
                    <p className="commit-title"><a href={commit.html_url}>{this.messageFilter(commit.commit.message)}</a></p>
                    <div>
                        <img className="commit-avatar" alt="avatar" src={commit.committer && commit.committer.avatar_url ? commit.committer.avatar_url: default_avatar_url} width="20" height="20"></img>
                        <span><strong>{commit.committer && commit.committer.login}</strong> commited <TimeAgo date={commit.commit.committer.date}/></span>
                    </div>
                </div>
            </div>:<div className="col-xs-12 commit-div">
                <div className="commit">
                    <p className="repo-title"><a>{<Skeleton/>}</a></p>
                    <p className="commit-title"><a>{<Skeleton/>}</a></p>
                    <div>
                        {<Skeleton/>}
                    </div>
                </div>
            </div>
        )
    }
}
export default Commit