- 11l.html
- 11s.html
- 12i.html

- 重新渲染dom之后之前节点绑定的事件失效？ 
> 这是因为 `querySelectorAll` 返回的节点列表是静态的，而不是动态的。如果在 `renderTodoList` 函数中重新渲染了 DOM，原来的节点列表就不再有效。
**解决方案**：在每次重新渲染后重新绑定事件监听器。
