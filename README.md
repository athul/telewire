# Bridger 🛩 🌉

**_Rather than putting the tag, use the latest commit id to improve security_**  

Bridger connects your GitHub Repo to Telegram about Repo Updates by a Bot you can create.

Create a chatbot with **botfather** bot in telegram. Get your chat id by speaking to **jsondumpbot** in telegram.

Since it is your repo and it should only be limited to you. Thats why you need to give your chat id to the bot. You can either give your **personal chat id** or a **channel chat id** and add the bot to it. 

You can add these details to the Repository Secrets by going to `<repo>/settings/secrets/`

## Notifications
- You can use the simple notifier at the master branch or the release tag like 
```yml
    - name: <WorkFlow Name>
      uses: athul/bridger@master
      if: always()
      with:
        chat: ${{ secrets.chat }}
        token: ${{ secrets.token }}
        status: ${{ job.status }}

```
The `chat` is the chat id/channel id and you can get that by talking to the json dump bot. The `token` is the bot's API token and you can create a bot by speaking to Botfather bot in Telegram.    


Hacked from the Core of Statusoli for githubHackathon