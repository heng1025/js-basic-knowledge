// 二叉搜索树-链表实现

class BSTNode {
  constructor(element) {
    this.element = element;
    this.left = null; // 左节点
    this.right = null; // 右节点
  }
}

class LinkedBST {
  constructor() {
    this._root = null;
    this._size = 0;
  }
  isEmpty() {
    return this._root === null;
  }
  // 查找元素
  find(element) {
    // helper function
    function recurse(node) {
      if (!node) {
        return null;
      }
      const nodeElement = node.element;
      if (element === nodeElement) {
        return nodeElement;
      }
      if (element < nodeElement) {
        return recurse(node.left);
      }
      return recurse(node.right);
    }
    if (this.isEmpty()) {
      return null;
    }
    return recurse(this._root);
  }
  // 添加
  add(element) {
    // helper function
    function recurse(node) {
      const nodeElement = node.element;

      if (element < nodeElement) {
        // 左子树
        if (!node.left) {
          node.left = new BSTNode(element);
        } else {
          recurse(node.left);
        }
      } else if (!node.right) {
        // 右子树
        node.right = new BSTNode(element);
      } else {
        recurse(node.right);
      }
    }

    if (this.isEmpty()) {
      this._root = new BSTNode(element);
    } else {
      recurse(this._root);
    }
    this._size++;
  }
  // 删除
  remove(element) {}
  // 先序 (根->左->右)
  preOrder() {
    const arr = [];
    function recurse(node) {
      if (node) {
        arr.push(node.element);
        recurse(node.left);
        recurse(node.right);
      }
    }
    recurse(this._root);
    return arr;
  }
  // 中序 (左->根->右)
  inOrder() {
    const arr = [];
    function recurse(node) {
      if (node) {
        recurse(node.left);
        arr.push(node.element);
        recurse(node.right);
      }
    }
    recurse(this._root);
    return arr;
  }
  // 后序 (左->右->根)
  postOrder() {
    const arr = [];
    function recurse(node) {
      if (node) {
        recurse(node.left);
        recurse(node.right);
        arr.push(node.element);
      }
    }
    recurse(this._root);
    return arr;
  }
  // 层序 (按层级从左到右的顺序访问,即广度优先遍历)
  levelOrder() {
    const arr = [];
    // 队列实现
    const queue = [this._root];
    while (queue.length > 0) {
      const node = queue.shift();
      arr.push(node.element);
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }

    return arr;
  }
}

const bst = new LinkedBST();
bst.add(4);
bst.add(2);
bst.add(7);
bst.add(1);
bst.add(3);
bst.add(5);
bst.add(8);
bst.add(9);
const re = bst.find(51);
console.log("re", re);
console.log("bst", bst);
console.log("bst preOrder", bst.preOrder());
console.log("bst inorder", bst.inOrder());
console.log("bst postorder", bst.postOrder());
console.log("bst levelorder", bst.levelOrder());
