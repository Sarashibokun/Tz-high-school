const newsPerPage = 4; // 1ページに表示するニュースの数
let newsCurrentPage = 1;    // 現在のページ

// JSONファイルを読み込んで、ニュースリストを表示する関数
fetch('news.json')
    .then(response => response.json())
    .then(data => {
        const totalPages = Math.ceil(data.length / newsPerPage); // 総ページ数を計算
        displayNews(data, newsCurrentPage, newsPerPage);             // 初期ページのニュースを表示
        setupPagination(data, totalPages);                        // ページネーションを設定
    })
    .catch(error => console.error('Error fetching news:', error));

// ニュースを表示する関数
function displayNews(data, page, newsPerPage) {
    const newsList = document.getElementById('newsList');
    newsList.innerHTML = '';  // 現在表示されているニュースをクリア

    const startIndex = (page - 1) * newsPerPage;
    const endIndex = page * newsPerPage;
    const paginatedItems = data.slice(startIndex, endIndex); // 現在のページのニュースを取得

    paginatedItems.forEach(news => {
        const newsLink = document.createElement('a');
        newsLink.href = news.url;
        newsLink.target = "_blank";

        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');

        newsItem.innerHTML = `
            <h2>${news.title}</h2>
            <p>${news.date}</p>
            <p>${news.description}</p>
        `;

        newsLink.appendChild(newsItem);
        newsList.appendChild(newsLink);
    });
}

// ページネーションを設定する関数
function setupPagination(data, totalPages) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';  // ページネーションをクリア

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.classList.add('pagination-btn');

        if (i === newsCurrentPage) {
            pageButton.classList.add('active'); // 現在のページにハイライトをつける
        }

        // ページボタンがクリックされた時の処理
        pageButton.addEventListener('click', function () {
            newsCurrentPage = i;
            displayNews(data, newsCurrentPage, newsPerPage);
            updatePagination(totalPages);
        });

        pagination.appendChild(pageButton);
    }
}

// 現在のページをハイライトする関数
function updatePagination(totalPages) {
    const buttons = document.querySelectorAll('.pagination-btn');
    buttons.forEach((button, index) => {
        if (index + 1 === newsCurrentPage) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}
