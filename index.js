'use strict';
const $confrc = new (require('confrc')).base();
const http = require('http');
const $src = new (require('statusrc')).statusrc;
const fs = require('fs');

const serverBase = function(){
    const _start=function(){
        http.createServer(function (req, res) {
            let post = '';
            req.on('data', function (chunk) {
                post += chunk;
            });
            req.on('end', async function () {
                
                return $src.end(
                    res,
                    200,
                    {
                       'clientId' :  fs.readFileSync(
                            '/proc/sys/kernel/random/uuid',
                            'utf8'
                        ).trim()
                    }
                );
            });
        }).listen(
            $confrc.get('httpd').port,
            $confrc.get('httpd').address
        );
    };
    _start();
};

(new serverBase());



