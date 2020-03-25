import { filterArray } from '../helper/filter'
import { MAX_PROJECTS_COUNT, MAX_COMMITS_COUNT } from '../helper/constants'
const axios = require("axios");

function getUsersRequest() {
    return {
        type: 'FETCH_USERS_REQUEST',
    }
}

function getUsersSuccess(data) {
    return {
        type: 'FETCH_USERS_SUCCESS',
        data: data
    }
}

function getUsersFail(error) {
    return {
        type: 'FETCH_USERS_FAILURE',
        err: error
    }
}

function getProjectsRequest() {
    return {
        type: 'FETCH_PROJECTS_REQUEST',
    }
}

function getProjectsSuccess(data) {
    return {
        type: 'FETCH_PROJECTS_SUCCESS',
        data: data
    }
}

function getProjectsFail(error) {
    return {
        type: 'FETCH_PROJECTS_FAILURE',
        err: error
    }
}

function getCommitsRequest() {
    return {
        type: 'FETCH_COMMITS_REQUEST',
    }
}

function getCommitsSuccess(data) {
    return {
        type: 'FETCH_COMMITS_SUCCESS',
        data: data
    }
}

function getCommitsFail(error) {
    return {
        type: 'FETCH_COMMITS_FAILURE',
        err: error
    }
}

export function getUsersInfo(users){
    return (dispatch) => {
        var usersinfo = [];
        var users_num = users.length;
        var count = 0;
        if (users_num < 1) return
        dispatch(getUsersRequest());
        console.log("user reqest")
        users.forEach((user, index, arr) => {
            axios
            .get("https://api.github.com/users/"+user, {
              auth: {
                username: process.env.REACT_APP_USER_GITHUB,
                password: process.env.REACT_APP_TOKEN_GITHUB }
              })
            .then(res => {
                count = count + 1
                if (res.status === 200) {
                    usersinfo = usersinfo.concat(res.data)
                    if (count === users_num){
                        dispatch(getUsersSuccess(usersinfo));
                        // console.log(usersinfo);
                    }
                }
            })
            .catch(err => {
                count = count + 1
                if (count === users_num){
                    dispatch(getUsersSuccess(usersinfo));
                }
                console.log("getUsersError")
            });
        });
    };
}

export function getCommits(repos){
    return (dispatch) => {
        var commits = [];
        var repos_num = repos.length;
        var count = 0;
        if (repos_num < 1) return
        dispatch(getCommitsRequest());
        repos.forEach((repo, index, arr) => {

            /****************
            *   only master branches
            *****************/
            axios
            .get("https://api.github.com/repos/"+repo.owner.login+"/"+repo.name+"/commits?sort=updated_at&page=0&per_page=1000", {
              auth: {
                username: process.env.REACT_APP_USER_GITHUB,
                password: process.env.REACT_APP_TOKEN_GITHUB }
              })
            .then(res => {
                count = count + 1
                if (res.status === 200) {
                    res.data.forEach((item, index) => {
                        item.repo = repo;
                        item.commit_date = item.commit.committer.date
                        commits.push(item);
                    })
                    // commits = commits.concat(res.data)
                    if (count === repos_num){
                        dispatch(getCommitsSuccess(commits));
                        // console.log(commits);
                    }
                }
            })
            .catch(err => {
                count = count + 1
                if (count === repos_num){
                    dispatch(getCommitsSuccess(commits));
                }
                console.log("getCommitsError")
            });

            /****************
            *   all branches
            *****************/
            // axios
            // .get("https://api.github.com/repos/"+repo.owner.login+"/"+repo.name+"/branches?access_token=9fe77e74cb27381e92cdd445c45deb747218f3a6&")
            // .then(res => {
            //     var branches = res.data;
            //     console.log(branches)
            //     // dispatch(getCommitsSuccess(commits));
            //     branches.forEach((branche, index, arr)=>{
            //         axios
            //         .get("https://api.github.com/repos/"+repo.owner.login+"/"+repo.name+"/commits?access_token=9fe77e74cb27381e92cdd445c45deb747218f3a6&sha="+branche.name+"&sort=updated_at&per_page=1000")
            //         .then(res => {
            //             count = count + 1

            //             if (res.status === 200) {
            //                 res.data.forEach((item, index) => {
            //                     item.repo = repo;
            //                     item.commit_date = item.commit.committer.date
            //                     commits.push(item);
            //                 })
            //                 // commits = commits.concat(res.data)
            //                 if (count === repos_num){
            //                     console.log(commits);
            //                     dispatch(getCommitsSuccess(commits));
            //                 }
            //             } else {
            //                 console.log("304 Error")
            //             }
            //         })
            //         .catch(err => {
            //             count = count + 1
            //             if (count === repos_num){
            //                 dispatch(getCommitsSuccess(commits));
            //             }
            //             console.log("getCommitsError")
            //         });
            //     })
            // })
            /* all branches end */
        });
    };
}

export function getProjects(users) {
    return (dispatch) => {
        var repos = [];
        var users_num = users.length;
        var count = 0;
        dispatch(getProjectsRequest());
        users.forEach((user, index, arr) => {
            axios
            .get("https://api.github.com/users/"+user+"/repos?sort=updated_at&per_page=100", {
              auth: {
                username: process.env.REACT_APP_USER_GITHUB,
                password: process.env.REACT_APP_TOKEN_GITHUB }
              })
            .then(res => {
                count = count + 1
                if (res.status === 200) {
                    repos = repos.concat(res.data)
                    if (count === users_num){
                        if (repos.length){
                            repos = filterArray(repos, "updated_at", "DESC", MAX_PROJECTS_COUNT)
                            // console.log(repos)
                            dispatch(getCommits(repos));
                            dispatch(getProjectsSuccess(repos));
                        } else {
                            dispatch(getProjectsFail());
                        }

                    }
                }
            })
            .catch(err => {
                count = count + 1
                if (count === users_num){
                    if (repos.length){
                        dispatch(getCommits(repos));
                        dispatch(getProjectsSuccess(repos));
                    } else {
                        dispatch(getProjectsFail());
                    }
                }
                console.log("getReposError")
            });
        })
    };
}
