import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, ExternalLink, Trash2, Edit3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLinks } from "@/hooks/useLinks";

const LinkManager = () => {
  const { links, addLink, updateLink, deleteLink, loading } = useLinks();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [editingLinkId, setEditingLinkId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    let result;
    if (editingLinkId) {
      result = await updateLink(editingLinkId, {
        title: title.trim(),
        url: url.trim()
      });
    } else {
      result = await addLink(title.trim(), url.trim());
    }

    if (result.error) {
      toast({
        title: "Error",
        description: result.error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: editingLinkId ? "Link Updated" : "Link Added",
      description: `Your link has been ${editingLinkId ? 'updated' : 'added'} successfully`,
    });

    setTitle("");
    setUrl("");
    setEditingLinkId(null);
    setIsOpen(false);
  };

  const handleEdit = (link: any) => {
    setEditingLinkId(link.id);
    setTitle(link.title);
    setUrl(link.url);
    setIsOpen(true);
  };

  const handleDelete = async (linkId: string) => {
    const result = await deleteLink(linkId);
    if (result.error) {
      toast({
        title: "Error",
        description: result.error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Link Deleted",
      description: "The link has been removed",
    });
  };

  const openEditDialog = () => {
    setEditingLinkId(null);
    setTitle("");
    setUrl("");
    setIsOpen(true);
  };

  if (loading) {
    return <div>Loading links...</div>;
  }

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
              {editingLinkId ? "Edit Link" : "Add New Link"}
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
              {editingLinkId ? "Update Link" : "Add Link"}
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