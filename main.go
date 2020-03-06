package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/yanzay/tbot/v2"
)

func main() {
	texts := map[string]string{
		"issues":        "‼️‼️‼️",
		"pull_request":  "🔃🔀⤴️🔃",
		"issue_comment": "🗣❗️🗣❗️🗣❗️🗣❗️",
		"push":          "⬆️⬆️⬆️⬆️",
		"watch":         "⭐️⭐️⭐️⭐️",
		"schedule":      "⏰⏰⏰⏰",
	}

	var (
		// inputs provided by Github Actions runtime
		// we should define them in action.yml
		token    = os.Getenv("INPUT_TOKEN")
		chat     = os.Getenv("INPUT_CHAT")
		status   = os.Getenv("INPUT_STATUS")
		stars    = os.Getenv("INPUT_STARGAZERS")
		forks    = os.Getenv("INPUT_FORKERS")
		ititle   = os.Getenv("INPUT_IU_TITLE")
		inum     = os.Getenv("INPUT_IU_NUM")
		ibody    = os.Getenv("INPUT_IU_BODY")
		icomment = os.Getenv("INPUT_IU_COM")
		prstate  = os.Getenv("INPUT_PR_STATE")
		prnum    = os.Getenv("INPUT_PR_NUM")
		prtitle  = os.Getenv("INPUT_PR_TITLE")
		prbody   = os.Getenv("INPUT_PR_BODY")

		// github environment context
		workflow = os.Getenv("GITHUB_WORKFLOW")
		repo     = os.Getenv("GITHUB_REPOSITORY")
		commit   = os.Getenv("GITHUB_SHA")
		person   = os.Getenv("GITHUB_ACTOR")
		event    = os.Getenv("GITHUB_EVENT_NAME")
	)

	// Create Telegram client using token
	c := tbot.NewClient(token, http.DefaultClient, "https://api.telegram.org")
	plink := fmt.Sprintf("https://github.com/%s/pulls/%s", repo, prnum)
	ilink := fmt.Sprintf("https://github.com/%s/issues/%s", repo, inum)
	rlink := fmt.Sprintf("https://github.com/%s", repo)

	text := texts[strings.ToLower(event)] // which icon to use?
	link := fmt.Sprintf("https://github.com/%s/commit/%s", repo, commit)
	var msg string
	// Prepare message to send
	if event == "issues" {
		msg = fmt.Sprintf(`
		New %s 
		
		Status: 	*%s*

		Repository:  	 [%s](%s) 

		Issue Number:  %s	| [%s]

		Issue Title: 	%s

		Issue Body:		*%s*

		Link:		[%s](%s)

		Issue By:   [%s]("https://github.com/%s")
		
		Event:		 *%s*
		
		`, text, status, repo, rlink, inum, prstate, ititle, ibody, inum, ilink, person, person, event)
	}
	if event == "schedule" {
		msg = fmt.Sprintf(`
		New %s 
		
		Status: 	*%s*

		Repository:  	 [%s](%s) 

		*This was run on Schedule*
		
		Event:		 *%s*
		
		`, text, status, repo, rlink, event)
	}
	if event == "issue_comment" {
		msg = fmt.Sprintf(`
		New %s  
		
		Status: 	*%s*

		Repository:  	 [%s](%s)

		Issue/PR Number:  %s	| [%s]

		Issue/PR Title: 	%s

		Comment:		*%s*

		Link to Issue:		[%s](%s)

		Comment by:   *%s* 

		Event:		 *%s*
		
		`, text, status, repo, rlink, inum, prstate, ititle, icomment, inum, ilink, person, event)
	}

	if event == "pull_request" {
		msg = fmt.Sprintf(`
		New %s  
		
		Status: 	*%s*

		Repository:  	 %s 

		PR Number:  %s	| [%s]

		PR Title: 	%s

		PR Body:		*%s*

		Link to PR:		[%s](%s)

		PR by:   *%s* 

		Event:		 *%s*
		
		`, text, status, repo, prnum, prstate, prtitle, prbody, prtitle, plink, person, event)
	}

	if event == "watch" {
		msg = fmt.Sprintf(`
		New %s 

		Status: 	*%s*

		Repository:  	 %s 

		Stars:		*%s*

		Forks:		%s

		Link:		[%s](%s)

		By:   [%s]("https://github.com/%s")
		
		`, text, status, repo, stars, forks, workflow, link, person, person)
	}
	if event == "push" {
		msg = fmt.Sprintf(`
		New %s 
		
		Status: 	*%s*

		Repository:  	 [%s](%s) 

		Link:		[%s](%s)

		Pushed by:   *%s* 

		Event:		 *%s*
		
		`, text, status, repo, rlink, workflow, link, person, event)
	}

	// Send to chat using Markdown format
	_, err := c.SendMessage(chat, msg, tbot.OptParseModeMarkdown)
	if err != nil {
		log.Fatalf("unable to send message: %v", err)
	}
}
