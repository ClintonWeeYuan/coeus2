import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { DateTimePicker } from "@/components/ui/date-time-picker/date-time-picker";

const CreateClassModal = () => {

    const [open, setOpen] = useState(false);

    const handleSubmit = () => {
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="ml-2 ">
                <Button>Add New Class</Button>
            </DialogTrigger>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create New Class</DialogTitle>
                        <DialogDescription>
                            This class will be saved in the database. Do try to fill in as much of the form as possible.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                defaultValue="Pedro Duarte"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Username
                            </Label>
                            <Input
                                id="username"
                                defaultValue="@peduarte"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Start
                            </Label>
                            <div className="col-span-3">
                                <DateTimePicker granularity={"minute"}/>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Duration
                            </Label>
                            <div className="col-span-3 flex items-center">
                                <Input type="number"/>
                                <p className="mx-2">Hours</p>
                                <Input type="number"/>
                                <p className="ml-2">Minutes</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="student" className="text-right">
                                Student
                            </Label>
                            <Input
                                id="student"
                                defaultValue="Eduardo"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="link" className="text-right">
                                Zoom Link
                            </Label>
                            <Input
                                id="link"
                                defaultValue="https:zoom/my-room"
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Create Class</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateClassModal;