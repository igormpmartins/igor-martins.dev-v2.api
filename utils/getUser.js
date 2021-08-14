const getUser = async (username) => {

    const url = `https://api.github.com/users/${username}/repos?sort=updated`
    const reposList = await fetch(url)
    const reposFull = await reposList.json()

    const urlUser = `https://api.github.com/users/${username}`
    const userData = await fetch(urlUser)
    const userFull = await userData.json()

    const user = {
        id: userFull.id,
        public_repos: userFull.public_repos,
        public_gists: userFull.public_gists
    }

    const isFork = rep => !rep.fork
    //const hideList = ['igormpmartins/minhas-series-rest']
    const hideList = []

    const isNotHidden = rep => hideList.indexOf(rep.full_name) === -1

    const extractData = rep => ({
        id: rep.id,
        full_name: rep.full_name,
        language: rep.language,
        description: rep.description,
        stargazers_count: rep.stargazers_count,
        html_url: rep.html_url
    })

    const repos = reposFull
                    .filter(isNotHidden)
                    .filter(isFork)
                    .map(extractData)

    return {
            repos,
            user
        }

}

export default getUser