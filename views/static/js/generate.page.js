function genrateQuestions() {
    subjectTabLinks = ''
    subjectTabs = ''
    console.log(localStorage.getItem('subjects'))
    let subjects = JSON.parse(localStorage.getItem('subjects'))
    subjects.forEach((subject, index) => {
        subjectTabLinks += `
        <li class="nav-item col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
            <a class="p-0 nav-link ${index == 0 ? 'active' : ''}" id="sub${index}-tab" data-toggle="tab" href="#sub${index}" role="tab" aria-controls="sub${index}" aria-selected="${index == 0 ? 'true' : 'false'}">
                <div class="text-center p-1 f-w--6" title="Click to switch subject">
                    ${subject}
                </div>
            </a>
        </li>
    `
        let questions = ''
        let questionTabLinks = ''
        for (var i = 1; i <= 50; i++) {
            questions += `
            <div class="tab-pane fade ${i == 1 ? 'show active' : ''}" data-next="${i == 50 ? '' : i + 1}" data-prev="${i == 1 ? '' : i - 1}" data-sub="${index}" id="sub${index}-q${i}" role="tabpanel" aria-labelledby="sub${index}-q${i}-tab">
                <div class="question-area mb-4">
                    <div class="question__theory mb-3 d-flex justify-content-start align-items-center flex-wrap">
                        <div class="text-nowrap">
                            <span class="f-w--6 f-s--3">Q</span>
                            <span class="f-w--5 f-xs--6">${i}.</span>
                        </div>
                        <div class="pl-2">
                            What happens when an unstopable force meets an
                            immovable object?
                        </div>
                    </div>
                    <div class="question__image col-11 col-sm-6 col-md-5 col-lg-3 pl-3 pl-sm-5">
                        <img src="../static/img/books-1.jpeg" alt="question-image" class="img-fluid rounded" />
                    </div>
                </div>
                <div class="answer-area mb-4">
                    <div class="mb-1">
                        <span class="f-w--5 f-s--2 text-uppercase">Options:</span>
                    </div>
                    <form action="#" class="form-horizontal">
                        <div class="form-group pl-2 mb-1">
                            <div class="custom-control custom-radio d-flex align-items-start">
                                <input id="sub${index}-q${i}-optA" class="custom-control-input" type="radio" name="sub${index}-q${i}-opts" />
                                <label for="sub${index}-q${i}-optA" class="custom-control-label c-pointer">
                                    <span class="f-w--6 f-s--2">A.</span>
                                    <span>Clareo is debugging</span>
                                </label>
                            </div>
                        </div>
                        <div class="form-group pl-2 mb-1">
                            <div class="custom-control custom-radio d-flex align-items-start">
                                <input id="sub${index}-q${i}-optB" class="custom-control-input" type="radio" name="sub${index}-q${i}-opts" />
                                <label for="sub${index}-q${i}-optB" class="custom-control-label c-pointer">
                                    <span class="f-w--6 f-s--2">B.</span>
                                    <span>Clareo have been debugging</span>
                                </label>
                            </div>
                        </div>
                        <div class="form-group pl-2 mb-1">
                            <div class="custom-control custom-radio d-flex align-items-start">
                                <input id="sub${index}-q${i}-optC" class="custom-control-input" type="radio" name="sub${index}-q${i}-opts" />
                                <label for="sub${index}-q${i}-optC" class="custom-control-label c-pointer">
                                    <span class="f-w--6 f-s--2">C.</span>
                                    <span>Clareo is still debugging</span>
                                </label>
                            </div>
                        </div>
                        <div class="form-group pl-2 mb-1">
                            <div class="custom-control custom-radio d-flex align-items-start">
                                <input id="sub${index}-q${i}-optD" class="custom-control-input" type="radio" name="sub${index}-q${i}-opts" />
                                <label for="sub${index}-q${i}-optD" class="custom-control-label c-pointer">
                                    <span class="f-w--6 f-s--2">D.</span>
                                    <span>Clareo gave up debugging!</span>
                                </label>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        `
            questionTabLinks +=
                `
            <li class="page-item">
                <a class="page-link text-success" id="sub${index}-q${i}-tab" data-toggle="tab" href="#sub${index}-q${i}" role="tab" aria-controls="sub${index}-q${i}" aria-selected="${i == 1 ? 'true' : 'false'}">${i}</a>
            </li>
        `
        }
        subjectTabs += `
        <div class="tab-pane fade ${index == 0 ? 'show active' : ''}" data-sub="${index}" role="tabpanel" aria-labelledby="sub${index}-tab">
            <!-- Question tab content -->
            <div class="tab-content" id="qs_tab_content">
                ${questions}
            </div>
            <!-- End Question tab content -->
            <!-- Question tab navigation -->
            <div class="question-num-area">
                <nav aria-label="Page navigation">
                    <ul class="pagination justify-content-center flex-wrap">
                        <li class="page-item prev-btn" data-sub="${index}">
                            <a id="s${index}" class="page-link text-success" href="#" aria-label="Previous">
                                <span id="s${index}" aria-hidden="true">&laquo;</span>
                                <span id="s${index}">Previous</span>
                            </a>
                        </li>
                        <li class="page-item next-btn" data-sub="${index}">
                            <a class="page-link text-success" href="#" id="s${index}"  aria-label="Next">
                                <span id="s${index}" aria-hidden="true">&raquo;</span>
                                <span id="s${index}">Next</span>
                            </a>
                        </li>
                    </ul>
                </nav>
                <nav aria-label="Page navigation">
                    <ul class="pagination nav nav-tabs justify-content-center" id="qs_tabs" role="tablist">
                        ${questionTabLinks}
                    </ul>
                </nav>
            </div>
            <!-- End Question tab navigation -->
        </div>
    `
    })
    document.querySelector('#subsTab').innerHTML = subjectTabLinks
    document.querySelector('#lawsTabContent').innerHTML = subjectTabs
    document.querySelectorAll('.custom-control-input').forEach((btn) => {
        btn.onclick = (e) => {
            let id = e.target.id.replace(new RegExp('\-opt[ABCD]'), '-tab')
            document.querySelector(`#${id}`).classList.add('answered')
        }
    })
}
genrateQuestions()

document.querySelector('.next-btn').onclick = (event) => {
    // console.log(event.target.datasets)
    let sub = event.target.id.substring(1)
    let d = document.querySelector(`.show .active`)
    let next = d.getAttribute('data-next')
    console.log(sub)
    if (!next) {
        return
    }
    d.classList.remove('show')
    d.classList.remove('active')

    a = document.querySelector(`#sub${sub}-q${next}`)
    a.classList.add('active')
    a.classList.add('show')
}

document.querySelector('.prev-btn').onclick = (event) => {
    // console.log(event.target.datasets)
    let sub = event.target.id.substring(1)
    let d = document.querySelector(`.show .active`)
    let prev = d.getAttribute('data-prev')
    console.log(sub)
    if (!prev) {
        return
    }
    d.classList.remove('show')
    d.classList.remove('active')

    a = document.querySelector(`#sub${sub}-q${prev}`)
    a.classList.add('active')
    a.classList.add('show')
}

document.querySelector('#end-btn').onclick = () => { endExam() }