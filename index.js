// Group API

const fetch = require('node-fetch');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
let APIRequests = 'None';

let myJSON = "";

let currentCount = 0;

console.clear()

const keyChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

let groupId = 0;
let qSearch = "";
let qPathname = "";
let qHost = "";

var http = require('http'); // Import Node.js core module

var server = http.createServer(function (req, res) {   //create web server 

let refreshCount = async () => {
    let groupResponse = await fetch(`https://groups.roblox.com/v1/groups/${groupId}/`);
    let groupResponse2 = await fetch(`https://groups.roblox.com/v0/groups/${groupId}/`);
    let groupBody = await groupResponse.json();
    let groupBody2 = await groupResponse2.json();

    let newCount = groupBody.memberCount;
    let newName = groupBody.name;

    let imageUrl = groupBody2.EmblemUrl;
    let owner_Start = groupBody2.Owner;
    let owner_Name = owner_Start.Name;
    let owner_Id = owner_Start.Id;

    if (newCount == 'undefined') return res.end(`{"status": "error", "error": "GroupId Input Not Valid Or An API Error!"}`);
    if (newName == 'undefined') return res.end(`{"status": "error", "error": "GroupId Input Not Valid Or An API Error!"}`);
    if (imageUrl == 'undefined') return res.end(`{"status": "error", "error": "GroupId Input Not Valid Or An API Error!"}`);
    if (owner_Start == 'undefined') return res.end(`{"status": "error", "error": "GroupId Input Not Valid Or An API Error!"}`);
    if (owner_Name == 'undefined') return res.end(`{"status": "error", "error": "GroupId Input Not Valid Or An API Error!"}`);
    if (owner_Id == 'undefined') return res.end(`{"status": "error", "error": "GroupId Input Not Valid Or An API Error!"}`);
    if (currentCount == 'undefined') return res.end(`{"status": "error", "error": "GroupId Input Not Valid Or An API Error!"}`);

    currentCount = newCount;    
    
    let groupData = `Owner Name: ${owner_Name}, Owner Id: ${owner_Id}, Group Image: ${imageUrl}`

    console.log(`GroupName: ${newName} | Member Count: ${currentCount} | GroupId: ${groupId} | GroupData: ${groupData} | qData, Search: ${qSearch} | qData, Pathname: ${qPathname} | qData, Host: ${qHost}`);
    res.writeHead(200);
    res.end(`{"status": "ok", "groupName": "${newName}", "memberCount": "${currentCount}", "groupId:": "${groupId}", "ownerName": "${owner_Name}", "ownerId": "${owner_Id}", "groupImage": "${imageUrl}"}`);
    await delay(4848)
    APIRequests = 'None';
}

    if (req.url == '/') { //check the URL of the current request
        
        //res.end(`{"status": "error", "error": "Service Is Locked Down Due To: Creator Unavailable!"}`);

        // set response header
        console.log(`User Enterd: /`)
        res.writeHead(200, { 'Content-Type': 'text/html' }); 
        
        // set response content    
        res.write('<html><body><p>Please Input A Request. | See: https://27st3-s-member-count-api.glitch.me/help</p></body></html>');
        res.end();
    
    } 

    else if (req.url == "/help") {
        
        res.end(`{"status": "error", "error": "Service Is Locked Down Due To: Creator Unavailable!"}`);

        console.log(`User Enterd: /help`)
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><p>Created By: Sectly_playz#1404, DM Me On Discord For Help/Support | Request URL: https://27st3-s-member-count-api.glitch.me/v1?groupId=GROUPID | Replace GROUPID With Your Groups Id </p></body></html>');
        res.end();
    
    }

    else if (req.url == "/killswitch") { // Tropical Express Kill Switch Set To 1 To Kill V3
        
        //res.end(`{"status": "error", "error": "Service Is Locked Down Due To: Creator Unavailable!"}`);

        res.writeHead(200);
        res.end(`{"kill": "0"}`);
    
    }

    else if (req.url == "/locationdata") { // Tropical Express Kill Switch Set To 1 To Kill V3
        
        //res.end(`{"status": "error", "error": "Service Is Locked Down Due To: Creator Unavailable!"}`);

        res.writeHead(200);
        res.end(`{"kill": "0"}`);
    
    }

    else if (req.url == "/unb-api") { // UnbelievaBoat API
      
        //res.end(`{"status": "error", "error": "Service Is Locked Down Due To: Creator Unavailable!"}`);
        
        const { Client } = require('unb-api');

        const options = {
          headers: {
            Authorization: process.env.unbToken
          }
        };

        res.writeHead(200);

        fetch(process.env.unbURL, options)
          .then( res => res.json() )
          .then( data => res.end(`${JSON.stringify(data)}`) );

    }

    else if (req.url == req.url) { // Link: /v1?groupId=
      
        //res.end(`{"status": "error", "error": "Service Is Locked Down Due To: Creator Unavailable!"}`);
        
        var url_Req = require('url');
        var q = url_Req.parse(`https://27st3-s-member-count-api.glitch.me/${req.url}`, true);
        qHost = q.host;
        qPathname = q.pathname;
        qSearch = q.search;
        var qdata = q.query;
        let groupInput = qdata.groupId;
        if(!groupInput) return res.end(`{"status": "error", "error": "GroupId Input Missing!"}`);
        if(!qPathname) return res.end(`{"status": "error", "error": "Invalid Version Of API Or Version Missing!"}`);
        if(qPathname != `//v1`) return res.end(`{"status": "error", "error": "Invalid Version Of API Or Version Missing!"}`);
        groupId = groupInput;
        if (APIRequests == 'Requested') return res.end(`{"status": "error", "error": "Too Many Requests!"}`);
        APIRequests = 'Requested';
        refreshCount();
    }
    else
        res.end(`{"status": "error", "error": "Invalid Request!"}`);

});

server.listen(5000); //6 - listen for any incoming requests

console.log('Node.js web server at port 5000 is running..')
