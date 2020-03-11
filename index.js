require("dotenv").config
const Bot=require('node-telegram-bot-api');
const {
    INPUT_STATUS: ipstatus,
    INPUT_TOKEN: tgtoken,
    INPUT_CHAT: chatid,
    INPUT_IU_TITLE: ititle,
    INPUT_IU_NUM: inum,
    INPUT_IU_ACTOR: iactor,
    INPUT_IU_BODY: ibody,
    INPUT_PR_NUM: pnum,
    INPUT_PR_STATE: prstate,
    INPUT_PR_TITLE: ptitle,
    INPUT_PR_BODY: pbody,
    GITHUB_EVENT_NAME: ghevent,
    GITHUB_REPOSITORY: repo,
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
            Issue Comment: \`${process.env.INPUT_IU_COM}\`
            [Link to Issue]("https://github.com/${repo}/issues/${inum}")
            [Link to Repo ]("https://github.com/${repo}/")
            [Build log here]("https://github.com/${repo}/commit/${sha}/checks")
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
            Star Count      ${process.env.INPUT_STARGAZERS}
            Fork Count      ${process.env.INPUT_FORKERS}
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