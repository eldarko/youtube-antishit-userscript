package main

import (
    "fmt"
	"strings"
	"regexp"
    "net/http"
	"io/ioutil"
)

func init() {
    http.HandleFunc("/", handler)
}

func handler(w http.ResponseWriter, r *http.Request) {
	b, err := ioutil.ReadFile("tmpl.user.js")
	if err != nil {
		fmt.Fprint(w, "Failed to read template file!")
	} else {
		re := regexp.MustCompile("\\s+")

		pattern := r.URL.Query().Get("pattern")
		pattern  = strings.TrimSpace(pattern)
		pattern  = re.ReplaceAllString(pattern, "|")

		fmt.Fprint(w, strings.Replace(string(b[:]), "__BLOCK_REGEXP__", pattern, -1))
	}
}
