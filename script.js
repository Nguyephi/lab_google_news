const docNewsList = () => document.getElementById('newsList')
const clearInput = () => document.getElementById('userSearchInput').value = "";
const clearTotalResult = () => document.getElementById('showsTotalResult').innerHTML = '';
let num = 0

const renderNewsFeed = (newsArticles) => {
    let html = '';
    newsArticles.map(({
        title,
        description,
        urlToImage,
        publishedAt,
        url,
        author,
        content
    }) => {
        const node = html += `
			<h1 style="display: inline-block;">${title}</h1>
            <h3>${description}</h3>
            <div style="display:flex; padding-bottom: 60px; margin: 2em 0; flex-flow: column; text-align: -webkit-center;">
                    <button style="width:20em;" class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                        More Info
                    </button>
                <div class="collapse" id="collapseExample">
                    <img src="${urlToImage}" style="display: block; float:right; height: 20%; width: 40%; padding-top: 1.9em; margin-left: 1em;">
                    <div style="0 15px;">
                        <p style="padding-top: 1.9em;">${content}</p>
                        <h5>${moment(publishedAt).format('ll')}</h5>
                        <h6><a href="${url}">${author || 'Associated Press'}</a></h6>
                    </div>
                </div>	
            </div>
        `
    docNewsList().innerHTML = node;
    })
    num += newsArticles.length;
    document.getElementById('showsTotalResult').innerHTML = "Total Result: " + num;
    num = 0
}

const getData = async () => {
    let userSearch = document.getElementById('userSearchInput').value || "news";
    const url = `https://newsapi.org/v2/everything?q=${userSearch}&apiKey=6eec2f7fe6cd4c40a3fef8f33f5778fe`;
    const req = new Request(url)
    const res = await fetch(req)
    const { articles }  = await res.json()
    // const response  = await res.json()
    // const articles = response.articles
    renderNewsFeed(articles)
}
getData()

let searchButton = () => {
    getData()
    clearInput()
}