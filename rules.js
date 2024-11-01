const rulesPerPage = 2; // 1ページに表示するルールの数
let rulesCurrentPage = 1;    // 現在のページ

// JSONファイルを読み込んで、ルールリストを表示する関数
fetch('rules.json')
    .then(response => response.json())
    .then(data => {
        const totalPages = Math.ceil(data.length / rulesPerPage); // 総ページ数を計算
        displayRules(data, rulesCurrentPage, rulesPerPage);             // 初期ページのルールを表示
        setupRulesPagination(data, totalPages);                    // ページネーションを設定
    })
    .catch(error => console.error('Error fetching rules:', error));

// ルールを表示する関数
function displayRules(data, page, rulesPerPage) {
    const rulesList = document.getElementById('ruleList');
    rulesList.innerHTML = '';  // 現在表示されているルールをクリア

    const startIndex = (page - 1) * rulesPerPage;
    const endIndex = page * rulesPerPage;
    const paginatedItems = data.slice(startIndex, endIndex); // 現在のページのルールを取得

    paginatedItems.forEach(rule => {
        const rulesLink = document.createElement('a');
        rulesLink.href = rule.url;
        rulesLink.target = "_blank";

        const rulesItem = document.createElement('div');
        rulesItem.classList.add('rules-item');

        rulesItem.innerHTML = `
            <h2>${rule.title}</h2>
            <p>${rule.date}</p>
            <p>${rule.description}</p>
        `;

        rulesLink.appendChild(rulesItem);
        rulesList.appendChild(rulesLink);
    });
}

// ページネーションを設定する関数
function setupRulesPagination(data, totalPages) {
    const pagination = document.getElementById('rulePagination');
    pagination.innerHTML = '';  // ページネーションをクリア

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.classList.add('pagination-btn');

        if (i === rulesCurrentPage) {
            pageButton.classList.add('active'); // 現在のページにハイライトをつける
        }

        pageButton.addEventListener('click', function () {
            rulesCurrentPage = i;
            displayRules(data, rulesCurrentPage, rulesPerPage);
            updateRulesPagination(totalPages);
        });

        pagination.appendChild(pageButton);
    }
}

// 現在のページをハイライトする関数
function updateRulesPagination(totalPages) {
    const buttons = document.querySelectorAll('#rulePagination .pagination-btn');
    buttons.forEach((button, index) => {
        if (index + 1 === rulesCurrentPage) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}
