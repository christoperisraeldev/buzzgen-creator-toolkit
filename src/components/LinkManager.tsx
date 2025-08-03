import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, ExternalLink, Trash2, Edit3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Link {
  id: string;
  title: string;
  url: string;
  clicks: number;
}

interface LinkManagerProps {
  links: Link[];
  onLinksChange: (links: Link[]) => void;
}

const LinkManager = ({ links, onLinksChange }: LinkManagerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (editingLink) {
      // Update existing link
      const updatedLinks = links.map(link => 
        link.id === editingLink.id 
          ? { ...link, title: title.trim(), url: url.trim() }
          : link
      );
      onLinksChange(updatedLinks);
      toast({
        title: "Link Updated",
        description: "Your link has been updated successfully",
      });
    } else {
      // Add new link
      const newLink: Link = {
        id: Date.now().toString(),
        title: title.trim(),
        url: url.trim(),
        clicks: 0,
      };
      onLinksChange([...links, newLink]);
      toast({
        title: "Link Added",
        description: "Your new link has been added successfully",
      });
    }

    setTitle("");
    setUrl("");
    setEditingLink(null);
    setIsOpen(false);
  };

  const handleEdit = (link: Link) => {
    setEditingLink(link);
    setTitle(link.title);
    setUrl(link.url);
    setIsOpen(true);
  };

  const handleDelete = (linkId: string) => {
    const updatedLinks = links.filter(link => link.id !== linkId);
    onLinksChange(updatedLinks);
    toast({
      title: "Link Deleted",
      description: "The link has been removed",
    });
  };

  const openEditDialog = () => {
    setEditingLink(null);
    setTitle("");
    setUrl("");
    setIsOpen(true);
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button onClick={openEditDialog} className="bg-brand-blue hover:bg-brand-blue/90">
            <Plus className="w-4 h-4 mr-2" />
            Add Link
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingLink ? "Edit Link" : "Add New Link"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., My Latest Blog Post"
              />
            </div>
            <div>
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
              />
            </div>
            <Button type="submit" className="w-full">
              {editingLink ? "Update Link" : "Add Link"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Links List */}
      <div className="mt-4 space-y-3">
        {links.map((link) => (
          <Card key={link.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-medium">{link.title}</h3>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  <span className="truncate">{link.url}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">{link.clicks} clicks</p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(link)}
                >
                  <Edit3 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(link.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
        {links.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No links added yet. Click "Add Link" to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkManager;