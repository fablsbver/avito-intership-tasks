type CreateTaskFields = {
    title: string;
    description: string;
    project: string;
    priority: string;
    performer: string;
};

type EditeTaskFields = {
    oldTitle: string;
    title: string;
    description: string;
    priority: string;
    status: string;
    performer: string;
};