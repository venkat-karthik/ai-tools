// LocalStorage Utility Functions

const Storage = {
    // Get tools from localStorage
    getTools: function() {
        try {
            const tools = localStorage.getItem('aiTools');
            return tools ? JSON.parse(tools) : [];
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return [];
        }
    },

    // Save tools to localStorage
    saveTools: function(tools) {
        try {
            localStorage.setItem('aiTools', JSON.stringify(tools));
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    },

    // Add a single tool
    addTool: function(tool) {
        const tools = this.getTools();
        tools.push(tool);
        return this.saveTools(tools);
    },

    // Update a tool by index
    updateTool: function(index, updatedTool) {
        const tools = this.getTools();
        if (index >= 0 && index < tools.length) {
            tools[index] = updatedTool;
            return this.saveTools(tools);
        }
        return false;
    },

    // Delete a tool by index
    deleteTool: function(index) {
        const tools = this.getTools();
        if (index >= 0 && index < tools.length) {
            tools.splice(index, 1);
            return this.saveTools(tools);
        }
        return false;
    },

    // Search tools
    searchTools: function(query) {
        const tools = this.getTools();
        const lowerQuery = query.toLowerCase();
        return tools.filter(tool => 
            tool.name.toLowerCase().includes(lowerQuery) ||
            tool.description.toLowerCase().includes(lowerQuery) ||
            tool.category.toLowerCase().includes(lowerQuery)
        );
    },

    // Filter tools by category
    filterByCategory: function(category) {
        const tools = this.getTools();
        if (category === 'all') return tools;
        return tools.filter(tool => tool.category === category);
    },

    // Get tools count
    getToolsCount: function() {
        return this.getTools().length;
    },

    // Get categories with counts
    getCategoriesWithCounts: function() {
        const tools = this.getTools();
        const categories = {};
        
        tools.forEach(tool => {
            if (categories[tool.category]) {
                categories[tool.category]++;
            } else {
                categories[tool.category] = 1;
            }
        });
        
        return categories;
    },

    // Clear all tools
    clearAll: function() {
        try {
            localStorage.removeItem('aiTools');
            return true;
        } catch (error) {
            console.error('Error clearing localStorage:', error);
            return false;
        }
    },

    // Export tools as JSON
    exportTools: function() {
        const tools = this.getTools();
        const dataStr = JSON.stringify(tools, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'ai-tools-export.json';
        link.click();
        
        URL.revokeObjectURL(url);
    },

    // Import tools from JSON
    importTools: function(jsonData) {
        try {
            const tools = JSON.parse(jsonData);
            if (Array.isArray(tools)) {
                return this.saveTools(tools);
            }
            return false;
        } catch (error) {
            console.error('Error importing tools:', error);
            return false;
        }
    },

    // Get storage size
    getStorageSize: function() {
        const tools = JSON.stringify(this.getTools());
        return new Blob([tools]).size;
    },

    // Check if storage is available
    isStorageAvailable: function() {
        try {
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (error) {
            return false;
        }
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Storage;
}
