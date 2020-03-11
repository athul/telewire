require("dotenv").config
const Bot=require('node-telegram-bot-api');
const {
    token: tgtoken,
    chat: chatid,
    INPUT_STATUS: ipstatus,
    GITHUB_EVENT_NAME: ghevent,
    GITHUB_REPOSITORY: repo,
    IU_TITLE: ititle,
    IU_NUM: inum,
    IU_ACTOR: iactor,
    IU_BODY: ibody,
    PR_NUM: pnum,
    PR_STATE: prstate,
    PR_TITLE: ptitle,
    PR_BODY: pbody,
    GITHUB_ACTOR: ghactor,
    GITHUB_SHA: sha,
    GITHUB_WORKFLOW:ghwrkflw
} = process.env;

const bot=new Bot(tgtoken)

const evresp = (gevent) => {
    switch (gevent) {
        case "issues":
            return `
            ❗️❗️❗️❗️❗️❗️
            Issue ${prstate}
            Issue Title and Number  : ${ititle} | #${inum}
            Commented or Created By : \`${iactor}\`
            Issue Body : *${ibody}*
            [Link to Issue]("https://github.com/${repo}/issues/${inum}")
            [Link to Repo ]("https://github.com/${repo}/")
            [Build log here]("https://github.com/${repo}/commit/${sha}/checks")
                `
        case "issue_comment":
            return `
            🗣🗣🗣🗣🗣🗣
            Issue ${prstate}
            Issue Title and Number  : ${ititle} | #${inum}
            Commented or Created By : \`${iactor}\`
            Issue Body : *${ibody}*
            Issue Comment: \`${process.env.IU_COM}\`
            [Link to Issue]("https://github.com/${repo}/issues/${IU_NUM}")
            [Link to Repo ]("https://github.com/${repo}/")
            [Build log here]("https://github.com/${repo}/commit/${GITHUB_SHA}/checks")
            `
        case "pull_request":
            return `
            🔃🔀🔃🔀🔃🔀
            PR ${prstate} 
            PR Number:      ${pnum}
            PR Title:       ${ptitle}
            PR Body:        *${pbody}*
            PR By:          ${ghactor}
            [Link to Issue]("https://github.com/${repo}/pull/${pnum}")
            [Link to Repo ]("https://github.com/${repo}/")
            [Build log here]("https://github.com/${repo}/commit/${sha}/checks")
            `
        case "watch":
            return `
            ⭐️⭐️⭐️
            By:            *${ghactor}* 
            \`Repository:  ${repo}\` 
            Star Count      ${process.env.STARGAZERS}
            Fork Count      ${process.env.FORKERS}
            [Link to Repo ]("https://github.com/${repo}/")
            `
        case "schedule":
            return `
            ⏱⏰⏱⏰⏱⏰
            ID: ${ghwrkflw}
            Run *${ipstatus}!*
            *Action was Run on Schedule*
            \`Repository:  ${repo}\` 
            [Link to Repo ]("https://github.com/${repo}/")
            `
        default:
            return `
            ⬆️⇅⬆️⇅
            ID: ${ghwrkflw}
            Action was a *${ipstatus}!*
            \`Repository:  ${repo}\` 
            On:          *${ghevent}*
            By:            *${ghactor}* 
            Tag:        ${process.env.GITHUB_REF}
            [Link to Repo ]("https://github.com/${repo}/")
            `
    }
}
const output=evresp(ghevent)
bot.sendMessage(chatid,output)