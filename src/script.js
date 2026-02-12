const editor = document.getElementById("editor")
const logList = document.getElementById("log")

let undoStack = [""]
let redoStack = []
let highlightCount = 0
let chordActive = false
let chordTimer = null
let debounceTimer = null

// ---------------- LOG FUNCTION ----------------
function logEvent(text){
 const div = document.createElement("div")
 div.setAttribute("data-test-id","event-log-entry")
 div.textContent = text
 logList.appendChild(div)
}

// ---------------- EVENT DASHBOARD LISTENERS ----------------
["keydown","keyup","input","compositionstart","compositionend"].forEach(type=>{
 editor.addEventListener(type,(e)=>{
   logEvent(`${type} | key:${e.key || ""} | ctrl:${e.ctrlKey} | meta:${e.metaKey}`)
 })
})

// ---------------- INPUT EVENT (STATE MANAGEMENT) ----------------
editor.addEventListener("input",()=>{
 undoStack.push(editor.value)
 redoStack = []
 debounceHighlight()
})

// ---------------- EXPOSED STATE FUNCTION ----------------
window.getEditorState = function(){
 return {
   content: editor.value,
   historySize: undoStack.length
 }
}

// ---------------- KEYDOWN SHORTCUT HANDLER ----------------
editor.addEventListener("keydown",(e)=>{

 const isMac = navigator.platform.toUpperCase().includes("MAC")
 const modifier = isMac ? e.metaKey : e.ctrlKey

 // -------- SAVE (Ctrl+S / Cmd+S) --------
 if(modifier && e.key==="s"){
   e.preventDefault()
   logEvent("Action: Save")
 }

 // -------- TAB / SHIFT+TAB INDENT --------
 if(e.key==="Tab"){
   e.preventDefault()

   const start = editor.selectionStart
   const value = editor.value
   const before = value.substring(0,start)
   const after = value.substring(start)

   if(e.shiftKey){
     if(before.endsWith("  ")){
       editor.value = before.slice(0,-2) + after
       editor.selectionStart = editor.selectionEnd = start - 2
     }
   }else{
     editor.value = before + "  " + after
     editor.selectionStart = editor.selectionEnd = start + 2
   }

   undoStack.push(editor.value)
   redoStack = []
 }

 // -------- ENTER INDENTATION COPY --------
 if(e.key==="Enter"){
   e.preventDefault()

   const start = editor.selectionStart
   const value = editor.value

   const before = value.substring(0,start)
   const after = value.substring(start)

   const lastLine = before.split("\n").pop()
   const spaces = lastLine.match(/^ */)[0]

   editor.value = before + "\n" + spaces + after
   editor.selectionStart = editor.selectionEnd = start + 1 + spaces.length

   undoStack.push(editor.value)
   redoStack = []
 }

 // -------- UNDO --------
 if(modifier && e.key==="z" && !e.shiftKey){
   e.preventDefault()

   if(undoStack.length>1){
     redoStack.push(undoStack.pop())
     editor.value = undoStack[undoStack.length-1]
   }
 }

 // -------- REDO --------
 if(modifier && e.key==="z" && e.shiftKey){
   e.preventDefault()

   if(redoStack.length){
     const val = redoStack.pop()
     undoStack.push(val)
     editor.value = val
   }
 }

 // -------- COMMENT TOGGLE (Ctrl+/) --------
 if(modifier && e.key==="/"){
   e.preventDefault()

   const start = editor.selectionStart
   const value = editor.value

   const lines = value.split("\n")
   const lineIndex = value.substring(0,start).split("\n").length - 1

   if(lines[lineIndex].startsWith("// ")){
     lines[lineIndex] = lines[lineIndex].slice(3)
   }else{
     lines[lineIndex] = "// " + lines[lineIndex]
   }

   editor.value = lines.join("\n")

   undoStack.push(editor.value)
   redoStack = []
 }

 // -------- CHORD SHORTCUT Ctrl+K THEN Ctrl+C --------
 if(modifier && e.key==="k"){
   chordActive = true
   clearTimeout(chordTimer)
   chordTimer = setTimeout(()=>{ chordActive=false },2000)
 }

 if(chordActive && modifier && e.key==="c"){
   e.preventDefault()
   logEvent("Action: Chord Success")
   chordActive=false
 }

})

// ---------------- DEBOUNCE HIGHLIGHT FUNCTION ----------------
function debounceHighlight(){
 clearTimeout(debounceTimer)
 debounceTimer = setTimeout(()=>{
   highlightCount++
 },150)
}

// ---------------- EXPOSED HIGHLIGHT COUNT ----------------
window.getHighlightCallCount = function(){
 return highlightCount
}
